import { useState, useEffect, useRef, useCallback } from 'react';

export function useCryptoPipeline() {
  const [wsConnected, setWsConnected] = useState(false);
  const [pipelineState, setPipelineState] = useState('IDLE'); // IDLE, RUNNING, COMPLETED, ERROR
  const [activeStep, setActiveStep] = useState(1);
  const [eventsLog, setEventsLog] = useState([]);

  // Pipeline Data States
  const [bbsData, setBbsData] = useState({
    params: null,
    steps: [],
    bits: [],
    summary: null
  });

  const [keyData, setKeyData] = useState({
    keySizeBits: 256,
    keyHex: '',
    rawHexCompact: '',
    byteGroupings: [],
    isKeyReady: false
  });

  const [encryptionData, setEncryptionData] = useState({
    plaintext: '',
    plaintextHex: '',
    nonceHex: '',
    authTagHex: '',
    ciphertextHex: '',
    isEncrypted: false
  });

  const [networkData, setNetworkData] = useState({
    packet: null,
    hops: [],
    status: 'IDLE'
  });

  const [attackData, setAttackData] = useState({
    attackType: 'NONE',
    title: '',
    description: '',
    tampered: false,
    modifiedField: null,
    details: null
  });

  const [decryptionData, setDecryptionData] = useState({
    status: 'IDLE',
    success: null,
    recoveredPlaintext: null,
    details: null
  });

  const [reportSummary, setReportSummary] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  const socketRef = useRef(null);

  // Initialize WebSocket Connection
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // Use window.location.host when proxied by Vite or direct backend port 8000
    const wsUrl = `${protocol}//${window.location.hostname}:8000/ws/pipeline`;
    
    let ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected to CRYPTOVISOR engine');
      setWsConnected(true);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setWsConnected(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      setWsConnected(false);
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        handleIncomingEvent(msg);
      } catch (err) {
        console.error('Failed to parse WebSocket message', err);
      }
    };

    socketRef.current = ws;

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const resetPipeline = useCallback(() => {
    setPipelineState('IDLE');
    setActiveStep(1);
    setEventsLog([]);
    setBbsData({ params: null, steps: [], bits: [], summary: null });
    setKeyData({ keySizeBits: 256, keyHex: '', rawHexCompact: '', byteGroupings: [], isKeyReady: false });
    setEncryptionData({ plaintext: '', plaintextHex: '', nonceHex: '', authTagHex: '', ciphertextHex: '', isEncrypted: false });
    setNetworkData({ packet: null, hops: [], status: 'IDLE' });
    setAttackData({ attackType: 'NONE', title: '', description: '', tampered: false, modifiedField: null, details: null });
    setDecryptionData({ status: 'IDLE', success: null, recoveredPlaintext: null, details: null });
    setReportSummary(null);
    setErrorDetails(null);
  }, []);

  const handleIncomingEvent = useCallback((event) => {
    // Append to live logs
    setEventsLog((prev) => [...prev, event]);

    switch (event.type) {
      case 'PIPELINE_STARTED':
        setPipelineState('RUNNING');
        setActiveStep(1);
        break;

      case 'BBS_INIT':
        setBbsData((prev) => ({
          ...prev,
          params: {
            p: event.p,
            q: event.q,
            n: event.n,
            seed: event.seed,
            x0: event.x0,
            formula_x0: event.formula_x0
          }
        }));
        break;

      case 'BBS_STEP':
        setBbsData((prev) => ({
          ...prev,
          steps: [...prev.steps.slice(-49), event], // Keep recent 50 steps for clean UI
          bits: [...prev.bits, event.output_bit]
        }));
        break;

      case 'BBS_SUMMARY':
        setBbsData((prev) => ({
          ...prev,
          summary: event
        }));
        // Move to Step 2 (Key Derivation)
        setActiveStep(2);
        break;

      case 'KEY_DERIVATION_STARTED':
        setKeyData((prev) => ({
          ...prev,
          keySizeBits: event.target_key_size_bits
        }));
        break;

      case 'KEY_GROUPING_STEP':
        setKeyData((prev) => ({
          ...prev,
          byteGroupings: [...prev.byteGroupings, event]
        }));
        break;

      case 'KEY_READY':
        setKeyData((prev) => ({
          ...prev,
          keyHex: event.key_hex,
          rawHexCompact: event.raw_hex_compact,
          byteGroupings: event.byte_groupings,
          isKeyReady: true
        }));
        // Move to Step 3 (AES Encryption)
        setActiveStep(3);
        break;

      case 'ENCRYPTION_STARTED':
        setEncryptionData((prev) => ({
          ...prev,
          plaintext: event.plaintext_raw
        }));
        break;

      case 'PLAINTEXT_CONVERTED':
        setEncryptionData((prev) => ({
          ...prev,
          plaintextHex: event.utf8_bytes_hex
        }));
        break;

      case 'NONCE_GENERATED':
        setEncryptionData((prev) => ({
          ...prev,
          nonceHex: event.nonce_hex
        }));
        break;

      case 'CIPHERTEXT_GENERATED':
        setEncryptionData((prev) => ({
          ...prev,
          ciphertextHex: event.ciphertext_hex,
          authTagHex: event.auth_tag_hex,
          isEncrypted: true
        }));
        // Move to Step 4 (Network Transmission)
        setActiveStep(4);
        break;

      case 'PACKET_CREATED':
        setNetworkData((prev) => ({
          ...prev,
          packet: event.packet,
          status: 'CREATED'
        }));
        break;

      case 'TRANSMISSION_STEP':
        setNetworkData((prev) => ({
          ...prev,
          hops: [...prev.hops, event],
          status: 'IN_TRANSIT'
        }));
        break;

      case 'TRANSMISSION_COMPLETED':
        setNetworkData((prev) => ({
          ...prev,
          status: 'DELIVERED'
        }));
        // Move to Step 5 (Attack Simulation)
        setActiveStep(5);
        break;

      case 'ATTACK_SIMULATION_STARTED':
        setAttackData((prev) => ({
          ...prev,
          attackType: event.attack_type,
          title: event.title,
          description: event.description
        }));
        break;

      case 'ATTACK_MODIFIED_PAYLOAD':
      case 'ATTACK_INTERCEPTED':
      case 'ATTACK_KEY_CORRUPTED':
        setAttackData((prev) => ({
          ...prev,
          details: event
        }));
        break;

      case 'ATTACK_RESULT':
        setAttackData((prev) => ({
          ...prev,
          tampered: event.tampered
        }));
        // Move to Step 6 (Decryption)
        setActiveStep(6);
        break;

      case 'DECRYPTION_STARTED':
        setDecryptionData((prev) => ({
          ...prev,
          status: 'DECRYPTING'
        }));
        break;

      case 'DECRYPTION_COMPLETED':
        setDecryptionData({
          status: 'COMPLETED',
          success: event.success,
          recoveredPlaintext: event.recovered_plaintext,
          details: event.details
        });
        // Move to Step 7 (Summary Report)
        setActiveStep(7);
        break;

      case 'PIPELINE_FINISHED':
        setPipelineState('COMPLETED');
        setReportSummary(event.summary);
        break;

      case 'PIPELINE_ERROR':
        setPipelineState('ERROR');
        setErrorDetails(event);
        break;

      default:
        break;
    }
  }, []);

  const startPipeline = useCallback((config) => {
    resetPipeline();
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      alert('WebSocket connection is offline. Make sure the backend server is running on port 8000.');
      return;
    }

    const payload = {
      action: 'START_PIPELINE',
      mode: config.mode || 'DEMO',
      message: config.message || 'Hello AIT',
      key_size_bits: config.key_size_bits || 256,
      attack_type: config.attack_type || 'NONE',
      p: config.p,
      q: config.q,
      seed: config.seed,
      speed_ms: config.speed_ms || 40
    };

    socketRef.current.send(JSON.stringify(payload));
  }, [resetPipeline]);

  return {
    wsConnected,
    pipelineState,
    activeStep,
    setActiveStep,
    eventsLog,
    bbsData,
    keyData,
    encryptionData,
    networkData,
    attackData,
    decryptionData,
    reportSummary,
    errorDetails,
    startPipeline,
    resetPipeline
  };
}
