import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Mail, BarChart3, Home, ArrowRight, ShieldCheck, ShieldAlert, Award, MessageSquare } from 'lucide-react';

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const report = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('interviewReport');
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }, []);

  const flagged = report?.flag_status === true;
  const confidenceRaw = report?.confidence_score;
  const confidenceNum = confidenceRaw != null && confidenceRaw !== '' ? parseFloat(confidenceRaw) : NaN;
  const confidence = Number.isFinite(confidenceNum) ? Number(confidenceNum.toFixed(2)) : null;

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '24px',
    },
    card: {
      width: '100%',
      maxWidth: '640px',
      background: '#fff',
      borderRadius: '20px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
      padding: '40px 36px',
      textAlign: 'center',
    },
    iconWrap: {
      width: '84px',
      height: '84px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 24px rgba(34,197,94,0.35)',
    },
    title: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#111827',
      margin: '0 0 10px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#4b5563',
      margin: '0 0 28px',
      lineHeight: 1.55,
    },
    nextWrap: {
      textAlign: 'left',
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '14px',
      padding: '20px 22px',
      marginBottom: '28px',
    },
    nextTitle: {
      fontSize: '15px',
      fontWeight: 700,
      color: '#111827',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      margin: '0 0 14px',
    },
    step: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '8px 0',
    },
    stepIcon: {
      flexShrink: 0,
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#eef2ff',
      color: '#4f46e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stepText: {
      fontSize: '14px',
      color: '#374151',
      lineHeight: 1.5,
      margin: 0,
    },
    actions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    btnPrimary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 22px',
      background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: 600,
      boxShadow: '0 8px 18px rgba(79,70,229,0.3)',
    },
    btnSecondary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 22px',
      background: '#fff',
      color: '#374151',
      border: '1px solid #d1d5db',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: 600,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>
          <CheckCircle2 size={44} color="#fff" />
        </div>

        <h1 style={styles.title}>Interview Submitted</h1>
        <p style={styles.subtitle}>
          {message || 'Thank you for completing your technical interview. Your responses have been recorded successfully.'}
        </p>

        {report && (
          <div style={{
            textAlign: 'left',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '14px',
            padding: '20px 22px',
            marginBottom: '20px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <p style={{ ...styles.nextTitle, marginBottom: '16px' }}>Your Interview Report</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#eef2ff', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4f46e5', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Award size={14} /> Score
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginTop: '6px' }}>
                  {report.marks || `${report.total_score || 0}/${(report.total_questions || 0) * 10}`}
                </div>
              </div>

              <div style={{ background: '#ecfeff', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0891b2', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <BarChart3 size={14} /> Confidence
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#111827', marginTop: '6px' }}>
                  {confidence != null ? `${confidence}%` : '—'}
                </div>
              </div>

              <div style={{ background: flagged ? '#fef2f2' : '#f0fdf4', borderRadius: '10px', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: flagged ? '#dc2626' : '#16a34a', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {flagged ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />} Integrity
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: flagged ? '#dc2626' : '#16a34a', marginTop: '6px' }}>
                  {flagged ? 'Flagged for review' : 'No issues detected'}
                </div>
              </div>
            </div>

            {Array.isArray(report.interview_logs) && report.interview_logs.length > 0 && (
              <details style={{ marginTop: '8px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#374151', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <MessageSquare size={14} /> View per-question feedback ({report.interview_logs.length})
                </summary>
                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {report.interview_logs.map((log, i) => (
                    <div key={i} style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px 12px' }}>
                      <div style={{ fontSize: '13px', color: '#6b7280' }}><strong>Q{i + 1}:</strong> {log.question}</div>
                      <div style={{ fontSize: '13px', color: '#374151', marginTop: '4px' }}><strong>You:</strong> {log.answer}</div>
                      <div style={{ fontSize: '12px', color: '#4f46e5', marginTop: '6px', fontWeight: 600 }}>Score: {log.score} {log.comment ? `— ${log.comment}` : ''}</div>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}

        <div style={styles.nextWrap}>
          <p style={styles.nextTitle}>What happens next</p>

          <div style={styles.step}>
            <div style={styles.stepIcon}><BarChart3 size={16} /></div>
            <p style={styles.stepText}>
              Our AI is analyzing your responses, confidence signals, and video frames to generate your evaluation report.
            </p>
          </div>

          <div style={styles.step}>
            <div style={styles.stepIcon}><Mail size={16} /></div>
            <p style={styles.stepText}>
              The recruiter will review your report and reach out via email with the next steps — typically within 2–3 business days.
            </p>
          </div>

          <div style={styles.step}>
            <div style={styles.stepIcon}><CheckCircle2 size={16} /></div>
            <p style={styles.stepText}>
              You can track this and your other interviews from the Completed Interviews page anytime.
            </p>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            onClick={() => navigate('/interview/completed')}
            style={styles.btnPrimary}
          >
            View My Interviews <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/candidate-dashboard')}
            style={styles.btnSecondary}
          >
            <Home size={16} /> Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
