'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, UserRound } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionTitle, COLORS } from './SectionWrapper';
import { WEDDING_INFO } from './weddingData';

interface AccountCardProps {
  role: string;
  name: string;
  bank: string;
  account: string;
  holder: string;
  color: string;
}

function AccountCard({ role, name, bank, account, holder, color }: AccountCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account.replace(/-/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = account;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 20,
        padding: '20px',
        marginBottom: 12,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: `${color}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UserRound size={22} style={{ color }} />
        </div>
        <div>
          <p style={{ fontSize: '0.65rem', color: COLORS.mid, letterSpacing: '0.12em', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
            {role}
          </p>
          <p style={{ color: COLORS.dark, fontSize: '1rem', fontFamily: 'Gowun Dodum, serif', marginTop: 1 }}>
            {name}
          </p>
        </div>
      </div>

      <div
        style={{
          background: COLORS.cream,
          borderRadius: 12,
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <p style={{ fontSize: '0.72rem', color: COLORS.mid, marginBottom: 3 }}>
            {bank} · {holder}
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: COLORS.dark, letterSpacing: '0.05em' }}>
            {account}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleCopy}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: copied ? `${COLORS.sage}25` : `${color}15`,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          {copied ? (
            <Check size={15} style={{ color: COLORS.sage }} />
          ) : (
            <Copy size={15} style={{ color }} />
          )}
        </motion.button>
      </div>

      {copied && (
        <p style={{ fontSize: '0.72rem', color: COLORS.sage, textAlign: 'center', marginTop: 8, letterSpacing: '0.05em' }}>
          ✓ 계좌번호가 복사되었습니다
        </p>
      )}
    </div>
  );
}

export function AccountSection() {
  const [open, setOpen] = useState(false);

  return (
    <SectionWrapper>
      <div style={{ padding: '48px 16px' }}>
        <SectionTitle ko="마음 전하기" en="ACCOUNT" />

        <p
          className="text-center mb-6"
          style={{ fontSize: '0.82rem', color: COLORS.mid, lineHeight: 1.8, fontFamily: 'Gowun Dodum, serif' }}
        >
          멀리서도 함께해 주시는 마음<br />
          감사히 받겠습니다
        </p>

        {/* Toggle button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(!open)}
          style={{
            width: '100%',
            padding: '16px',
            background: open ? COLORS.cream : COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            marginBottom: 0,
          }}
        >
          <span style={{ fontFamily: 'Gowun Dodum, serif', color: COLORS.dark, fontSize: '0.9rem' }}>
            계좌번호 보기
          </span>
          {open ? (
            <ChevronUp size={18} style={{ color: COLORS.mid }} />
          ) : (
            <ChevronDown size={18} style={{ color: COLORS.mid }} />
          )}
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: 12 }}>
                <p
                  style={{
                    fontSize: '0.7rem',
                    color: COLORS.gold,
                    letterSpacing: '0.12em',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    marginBottom: 10,
                    paddingLeft: 4,
                  }}
                >
                  신랑측
                </p>
                <AccountCard
                  role="신랑"
                  name={WEDDING_INFO.groom.name}
                  bank={WEDDING_INFO.groom.bank}
                  account={WEDDING_INFO.groom.account}
                  holder={WEDDING_INFO.groom.holder}
                  color={COLORS.rose}
                />
                {WEDDING_INFO.groom.fatherAccount && (
                  <AccountCard
                    role="신랑 아버지"
                    name={WEDDING_INFO.groom.fatherName}
                    bank={WEDDING_INFO.groom.fatherBank}
                    account={WEDDING_INFO.groom.fatherAccount}
                    holder={WEDDING_INFO.groom.fatherName}
                    color={COLORS.rose}
                  />
                )}
                {WEDDING_INFO.groom.motherAccount && (
                  <AccountCard
                    role="신랑 어머니"
                    name={WEDDING_INFO.groom.motherName}
                    bank={WEDDING_INFO.groom.motherBank}
                    account={WEDDING_INFO.groom.motherAccount}
                    holder={WEDDING_INFO.groom.motherName}
                    color={COLORS.rose}
                  />
                )}

                <p
                  style={{
                    fontSize: '0.7rem',
                    color: COLORS.gold,
                    letterSpacing: '0.12em',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontStyle: 'italic',
                    marginBottom: 10,
                    marginTop: 6,
                    paddingLeft: 4,
                  }}
                >
                  신부측
                </p>
                <AccountCard
                  role="신부"
                  name={WEDDING_INFO.bride.name}
                  bank={WEDDING_INFO.bride.bank}
                  account={WEDDING_INFO.bride.account}
                  holder={WEDDING_INFO.bride.holder}
                  color={COLORS.sage}
                />
                {WEDDING_INFO.bride.fatherAccount && (
                  <AccountCard
                    role="신부 아버지"
                    name={WEDDING_INFO.bride.fatherName}
                    bank={WEDDING_INFO.bride.fatherBank}
                    account={WEDDING_INFO.bride.fatherAccount}
                    holder={WEDDING_INFO.bride.fatherName}
                    color={COLORS.sage}
                  />
                )}
                {WEDDING_INFO.bride.motherAccount && (
                  <AccountCard
                    role="신부 어머니"
                    name={WEDDING_INFO.bride.motherName}
                    bank={WEDDING_INFO.bride.motherBank}
                    account={WEDDING_INFO.bride.motherAccount}
                    holder={WEDDING_INFO.bride.motherName}
                    color={COLORS.sage}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
