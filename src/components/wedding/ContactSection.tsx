'use client';

import { Phone, MessageCircle, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionTitle, COLORS } from './SectionWrapper';
import { WEDDING_INFO } from './weddingData';

interface ContactPersonProps {
  role: string;
  name: string;
  phone: string;
  accentColor: string;
}

function ContactPerson({ role, name, phone, accentColor }: ContactPersonProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: `${accentColor}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <UserRound size={18} style={{ color: accentColor }} />
        </div>
        <div>
          <p style={{ fontSize: '0.7rem', color: COLORS.mid, letterSpacing: '0.05em', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
            {role}
          </p>
          <p style={{ fontFamily: 'Gowun Dodum, serif', fontSize: '0.9rem', color: COLORS.dark }}>
            {name}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <motion.a
          href={`tel:${phone}`}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${accentColor}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <Phone size={15} style={{ color: accentColor }} />
        </motion.a>
        <motion.a
          href={`sms:${phone}`}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${COLORS.sage}18`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <MessageCircle size={15} style={{ color: COLORS.sage }} />
        </motion.a>
      </div>
    </div>
  );
}

interface ContactGroupProps {
  title: string;
  color: string;
  contacts: Array<{ role: string; name: string; phone: string }>;
}

function ContactGroup({ title, color, contacts }: ContactGroupProps) {
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
      <p
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          color,
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          marginBottom: 4,
        }}
      >
        {title}
      </p>
      {contacts.map((c, i) => (
        <ContactPerson key={i} {...c} accentColor={color} />
      ))}
    </div>
  );
}

export function ContactSection() {
  const groomContacts = [
    { role: '신랑', name: WEDDING_INFO.groom.name, phone: WEDDING_INFO.groom.phone },
    { role: '신랑 아버지', name: WEDDING_INFO.groom.fatherName, phone: WEDDING_INFO.groom.fatherPhone },
    { role: '신랑 어머니', name: WEDDING_INFO.groom.motherName, phone: WEDDING_INFO.groom.motherPhone },
  ];

  const brideContacts = [
    { role: '신부', name: WEDDING_INFO.bride.name, phone: WEDDING_INFO.bride.phone },
    { role: '신부 아버지', name: WEDDING_INFO.bride.fatherName, phone: WEDDING_INFO.bride.fatherPhone },
    { role: '신부 어머니', name: WEDDING_INFO.bride.motherName, phone: WEDDING_INFO.bride.motherPhone },
  ];

  return (
    <SectionWrapper>
      <div style={{ padding: '48px 16px' }}>
        <SectionTitle ko="연락처" en="CONTACT" />

        <p
          className="text-center mb-6"
          style={{ fontSize: '0.82rem', color: COLORS.mid, lineHeight: 1.8, fontFamily: 'Gowun Dodum, serif' }}
        >
          궁금한 사항은 언제든지<br />연락 주세요
        </p>

        <ContactGroup
          title="신랑측"
          color={COLORS.rose}
          contacts={groomContacts}
        />

        <ContactGroup
          title="신부측"
          color={COLORS.sage}
          contacts={brideContacts}
        />
      </div>
    </SectionWrapper>
  );
}
