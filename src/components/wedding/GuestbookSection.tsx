'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionWrapper, SectionTitle, COLORS } from './SectionWrapper';
import { Trash2, Send, Heart, Star, Sparkles, Leaf, Music, Gift, Sun, Cloud, Smile, Coffee } from 'lucide-react';
import { AvatarIcon } from './AvatarIcon';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
  icon: string;
}

const DEFAULT_MESSAGES: GuestMessage[] = [
  {
    id: 'default1',
    name: '박민수',
    message: '지훈아 서연아 정말 축하해! 너희 두 사람 정말 잘 어울려~ 오래오래 행복하게 살아',
    date: '2026.03.20',
    icon: 'heart',
  },
  {
    id: 'default2',
    name: '김지영',
    message: '서연 언니 결혼 축하해요!! 지훈 오빠도 축하드려요. 둘이 너무 예뻐서 청첩장 보고 눈물날 뻔 했어요',
    date: '2026.03.21',
    icon: 'star',
  },
  {
    id: 'default3',
    name: '이준호',
    message: '지훈이 드디어 결혼하는구나 ㅎㅎ 행복하게 살고 자주 보자! 꼭 참석할게~',
    date: '2026.03.22',
    icon: 'sparkles',
  },
];

const STICKERS = [
  { key: 'heart', Icon: Heart },
  { key: 'star', Icon: Star },
  { key: 'sparkles', Icon: Sparkles },
  { key: 'leaf', Icon: Leaf },
  { key: 'music', Icon: Music },
  { key: 'gift', Icon: Gift },
  { key: 'sun', Icon: Sun },
  { key: 'cloud', Icon: Cloud },
  { key: 'smile', Icon: Smile },
  { key: 'coffee', Icon: Coffee },
];

function StickerIcon({ iconKey, size = 16, color }: { iconKey: string; size?: number; color?: string }) {
  const sticker = STICKERS.find((s) => s.key === iconKey) ?? STICKERS[0];
  const { Icon } = sticker;
  return <Icon size={size} style={{ color: color ?? COLORS.gold }} />;
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 12,
  border: `1px solid ${COLORS.border}`,
  background: COLORS.card,
  color: COLORS.dark,
  fontFamily: 'Gowun Dodum, serif',
  fontSize: '0.88rem',
  outline: 'none',
  boxSizing: 'border-box' as const,
};

export function GuestbookSection() {
  const [messages, setMessages] = useState<GuestMessage[]>(DEFAULT_MESSAGES);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_guestbook');
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('heart');
  const [error, setError] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_guestbook', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const handleSubmit = () => {
    if (!name.trim()) { setError('이름을 입력해주세요'); return; }
    if (!message.trim()) { setError('메시지를 입력해주세요'); return; }
    if (message.trim().length < 5) { setError('메시지를 조금 더 작성해주세요'); return; }
    setError('');

    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    const newMsg: GuestMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      date: dateStr,
      icon: selectedIcon,
    };

    setMessages((prev) => [newMsg, ...prev]);
    setName('');
    setMessage('');
    setSelectedIcon('heart');
  };

  const handleDelete = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <SectionWrapper>
      <div style={{ padding: '48px 16px' }}>
        <SectionTitle ko="방명록" en="GUESTBOOK" />

        {/* Write form */}
        <div
          style={{
            background: COLORS.cream,
            borderRadius: 20,
            padding: '20px',
            marginBottom: 24,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            {/* Icon picker */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowPicker(!showPicker)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.card,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <StickerIcon iconKey={selectedIcon} size={20} />
              </button>
              <AnimatePresence>
                {showPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      top: 50,
                      left: 0,
                      background: COLORS.card,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 12,
                      padding: 10,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: 6,
                      zIndex: 10,
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    }}
                  >
                    {STICKERS.map(({ key }) => (
                      <button
                        key={key}
                        onClick={() => { setSelectedIcon(key); setShowPicker(false); }}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          border: 'none',
                          background: key === selectedIcon ? COLORS.cream : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <StickerIcon iconKey={key} size={16} />
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>

          <textarea
            placeholder="축하 메시지를 남겨주세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: 'none', lineHeight: 1.7, marginBottom: 10 }}
          />

          {error && (
            <p style={{ fontSize: '0.75rem', color: COLORS.rose, marginBottom: 8 }}>{error}</p>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: 12,
              border: 'none',
              background: '#C0D3B4',
              color: '#2C3E2C',
              fontFamily: 'Gowun Dodum, serif',
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              letterSpacing: '0.06em',
            }}
          >
            <Send size={14} />
            방명록 남기기
          </motion.button>
        </div>

        {/* Message count */}
        <p style={{ fontSize: '0.75rem', color: COLORS.mid, marginBottom: 12 }}>
          총 <strong style={{ color: COLORS.rose }}>{messages.length}</strong>개의 메시지
        </p>

        {/* Messages list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 16,
                  padding: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AvatarIcon seed={parseInt(msg.id.replace(/\D/g, '').slice(-1) || '0')} size={36} />
                    <div>
                      <p style={{ fontFamily: 'Gowun Dodum, serif', fontSize: '0.88rem', color: COLORS.dark }}>
                        {msg.name}
                      </p>
                      <p style={{ fontSize: '0.68rem', color: COLORS.mid }}>{msg.date}</p>
                    </div>
                  </div>
                  {!msg.id.startsWith('default') && (
                    <button
                      onClick={() => handleDelete(msg.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 4,
                        opacity: 0.4,
                      }}
                    >
                      <Trash2 size={13} style={{ color: COLORS.mid }} />
                    </button>
                  )}
                </div>
                <p style={{ fontSize: '0.84rem', color: COLORS.dark, lineHeight: 1.7 }}>
                  {msg.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
