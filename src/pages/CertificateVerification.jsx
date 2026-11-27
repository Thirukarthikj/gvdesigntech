import React, { useState, useEffect } from 'react';
import { certStyles as q } from '../data/styles.js';
import { getStoredCertificates, subscribeToContentUpdates } from '../data/contentPersistence.js';

export default function CertificateVerification() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [certificates, setCertificates] = useState(() => getStoredCertificates());

  useEffect(() => {
    // Load from MongoDB / API if running, fallback to stored registry
    async function loadCertificates() {
      try {
        const res = await fetch('/api/certificates');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object' && Object.keys(data).length > 0) {
            setCertificates(data);
            return;
          }
        }
      } catch {}
      setCertificates(getStoredCertificates());
    }
    loadCertificates();

    // Subscribe to content updates from Admin Panel
    const unsubscribe = subscribeToContentUpdates(() => {
      setCertificates(getStoredCertificates());
    });
    const handleUpdate = () => {
      setCertificates(getStoredCertificates());
    };
    window.addEventListener('gv_content_updated', handleUpdate);

    return () => {
      unsubscribe();
      window.removeEventListener('gv_content_updated', handleUpdate);
    };
  }, []);

  const handleVerify = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSearched(true);
    const query = (certId || '').trim().toUpperCase();

    if (!query) {
      setResult(null);
      return;
    }

    // STRICT EXACT LOOKUP: Must match the exact certificate ID issued in the Admin Panel
    let matched = null;
    if (certificates && typeof certificates === 'object') {
      // 1. Direct key match (case-insensitive)
      if (certificates[query]) {
        matched = certificates[query];
      } else {
        const matchingKey = Object.keys(certificates).find(k => k.trim().toUpperCase() === query);
        if (matchingKey && certificates[matchingKey]) {
          matched = certificates[matchingKey];
        } else {
          // 2. Direct object value match by certId or id
          const found = Object.values(certificates).find(c => {
            if (!c) return false;
            const cId = (c.certId || c.id || '').trim().toUpperCase();
            return cId === query;
          });
          if (found) {
            matched = found;
          }
        }
      }
    }

    // ONLY set result if the EXACT certificate exists in the admin panel registry.
    // Absolutely NO demo/mock fallback for random characters!
    setResult(matched || null);
  };

  const isRevoked = result && result.status === 'REVOKED';
  const isPending = result && result.status === 'PENDING REVIEW';

  return (
    <div className={q.page} style={{ minHeight: '100vh', background: '#04020a', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(57, 208, 255, 0.15)', border: '1px solid rgba(57, 208, 255, 0.4)', borderRadius: '999px', color: '#39d0ff', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            CREDENTIAL VERIFICATION
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Verify Your Professional Credentials
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto 32px', fontSize: '16.5px', color: '#94a3b8', lineHeight: 1.6 }}>
            Instant digital validation for corporate recruiters, university registrars, and hiring managers worldwide.
          </p>

          {/* Verification Input Form */}
          <form onSubmit={handleVerify} style={{ maxWidth: '580px', margin: '0 auto 16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Enter Exact Certificate ID (e.g. GV-CAD-2024-105)"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              required
              style={{
                flex: 1,
                minWidth: '260px',
                padding: '14px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(217, 70, 239, 0.35)'
              }}
            >
              Verify Now
            </button>
          </form>
          <div style={{ fontSize: '12.5px', color: '#64748b' }}>
            Enter the exact certificate serial number printed on your credential (e.g. GV-CAD-2024-105). Partial or random inputs will not verify.
          </div>
        </div>

        {/* Verification Result Card */}
        {searched && (
          <div style={{ marginBottom: '60px' }}>
            {result ? (
              <div style={{
                padding: '36px',
                background: isRevoked
                  ? 'linear-gradient(160deg, rgba(68, 20, 30, 0.85), rgba(24, 6, 12, 0.95))'
                  : 'linear-gradient(160deg, rgba(30, 22, 68, 0.8), rgba(6, 6, 24, 0.9))',
                border: isRevoked ? '1px solid #ef4444' : (isPending ? '1px solid #f59e0b' : '1px solid #22d3ee'),
                borderRadius: '24px',
                boxShadow: isRevoked ? '0 0 30px rgba(239, 68, 68, 0.25)' : '0 0 30px rgba(34, 211, 238, 0.2)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '28px' }}>{isRevoked ? '❌' : (isPending ? '⏳' : '✅')}</span>
                    <span style={{
                      padding: '6px 16px',
                      background: isRevoked ? 'rgba(239, 68, 68, 0.15)' : (isPending ? 'rgba(245, 158, 11, 0.15)' : 'rgba(34, 211, 238, 0.15)'),
                      border: isRevoked ? '1px solid #ef4444' : (isPending ? '1px solid #f59e0b' : '1px solid #22d3ee'),
                      borderRadius: '999px',
                      color: isRevoked ? '#f87171' : (isPending ? '#fbbf24' : '#22d3ee'),
                      fontSize: '13px',
                      fontWeight: '800'
                    }}>
                      {result.status || 'VERIFIED AUTHENTIC'}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                    Certificate ID: <strong style={{ color: '#fff' }}>{result.certId || result.id || certId.trim().toUpperCase()}</strong>
                  </span>
                </div>

                {isRevoked && (
                  <div style={{
                    padding: '12px 16px',
                    marginBottom: '20px',
                    background: 'rgba(239, 68, 68, 0.12)',
                    border: '1px solid rgba(239, 68, 68, 0.35)',
                    borderRadius: '10px',
                    color: '#fca5a5',
                    fontSize: '13.5px'
                  }}>
                    ⚠️ <strong>Notice:</strong> This certificate record has been flagged as REVOKED or SUSPENDED in our central registry.
                  </div>
                )}

                {/* Verified Graduate Banner with Student Photo */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '22px',
                  padding: '20px 24px',
                  marginBottom: '26px',
                  background: 'rgba(56, 189, 248, 0.06)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '18px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    {(result.studentImage || result.image) ? (
                      <img
                        src={result.studentImage || result.image}
                        alt={result.name}
                        style={{
                          width: '92px',
                          height: '92px',
                          borderRadius: '16px',
                          objectFit: 'cover',
                          border: '2px solid #38bdf8',
                          boxShadow: '0 8px 24px rgba(56, 189, 248, 0.35)',
                          display: 'block'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '92px',
                        height: '92px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(56, 189, 248, 0.3))',
                        border: '2px solid rgba(56, 189, 248, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38bdf8',
                        fontSize: '36px',
                        fontWeight: '800'
                      }}>
                        {result.name ? result.name.charAt(0).toUpperCase() : '🎓'}
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: '-7px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                      color: '#000',
                      fontSize: '9.5px',
                      fontWeight: '900',
                      letterSpacing: '0.6px',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4)'
                    }}>
                      VERIFIED
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11.5px', letterSpacing: '1px', textTransform: 'uppercase', color: '#38bdf8', fontWeight: '800', marginBottom: '4px' }}>
                      <span>🛡️</span>
                      <span>VERIFIED GRADUATE STUDENT</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: '800', color: '#fff', margin: '0 0 6px', letterSpacing: '-0.3px' }}>
                      {result.name}
                    </h2>
                    <div style={{ fontSize: '14.5px', color: '#cbd5e1', fontWeight: '500', lineHeight: 1.4 }}>
                      {result.course}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>STUDENT NAME</div>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{result.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>PROGRAM COMPLETED</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#e879f9' }}>{result.course}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>GRADE / RATING</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#34d399' }}>{result.grade}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>ISSUED BY</div>
                    <div style={{ fontSize: '14px', color: '#cbd5e1' }}>{result.issuedBy}</div>
                  </div>
                </div>

                <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '12.5px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <span>ISO 9001:2015 Certified Verification Gateway</span>
                  <span>Issued: {result.completionDate}</span>
                </div>
              </div>
            ) : (
              <div style={{ padding: '36px 24px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '20px', color: '#fca5a5' }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>⚠️</div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#fff', margin: '0 0 8px' }}>Credential Not Found</h3>
                <p style={{ margin: '0 auto 12px', maxWidth: '520px', fontSize: '14px', color: '#fca5a5', lineHeight: 1.5 }}>
                  No official certificate record was found for Certificate ID <strong style={{ color: '#fff', textDecoration: 'underline' }}>&quot;{certId.trim().toUpperCase()}&quot;</strong>.
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                  Please ensure you type the exact certificate serial number registered in our system (e.g. GV-CAD-2024-105). If you believe this is an error, please email <strong>gvdesigntech707@gmail.com</strong>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '24px', background: 'rgba(26, 18, 66, 0.5)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Certificate Authenticity</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Each certificate carries a unique cryptographic identifier registered with our central academic repository.
            </p>
          </div>
          <div style={{ padding: '24px', background: 'rgba(26, 18, 66, 0.5)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Recruiter Verification</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              HR teams and background screening partners can verify candidate training records in real time without delays.
            </p>
          </div>
          <div style={{ padding: '24px', background: 'rgba(26, 18, 66, 0.5)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
            <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Global Recognition</h4>
            <p style={{ fontSize: '13.5px', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
              Accepted across 150+ technology hiring partners, universities, and international corporate employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
