import { useState } from 'react';

const useForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [verificationKey, setVerificationKey] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendVerificationKey = async (email) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/password-reset/send-verification-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setStep(2);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to send verification key. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyKey = async (verificationKey) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/password-reset/verify-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationKey }),
      });
      const data = await response.json();
      if (data.success) {
        setStep(3);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to verify key. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email, verificationKey, newPassword) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/password-reset/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, verificationKey, newPassword }),
      });
      const data = await response.json();
      if (data.success) {
        setStep(4);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    email,
    setEmail,
    verificationKey,
    setVerificationKey,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    sendVerificationKey,
    verifyKey,
    resetPassword,
  };
};

export default useForgotPassword;
