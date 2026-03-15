
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Experience, SkillCategory, Product, JournalArticle } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'NPO TORINO ITALY',
    period: '2013 – Today',
    role: 'Senior System Administrator',
    location: 'Turin, Italy',
    summary: 'Gestione dell\'infrastruttura di monitoraggio enterprise per un parco macchine di centinaia di server.',
    details: [
      'Gestione Monitoraggio Zabbix: Installazione e configurazione agent su ambienti eterogenei.',
      'Engineering Software: Creazione di build custom degli agent Zabbix per Linux con linking statico.',
      'Quality Assurance: Troubleshooting degli agenti e garanzia continuità del servizio.'
    ],
    technologies: ['Zabbix', 'Linux', 'Windows Server', 'C (Static Linking)', 'Troubleshooting'],
    imageUrl: '/images/npo-torino.jpg'
  },
  {
    id: 'exp2',
    company: 'BANCO ARGENTARIA',
    period: '2004 - 2007',
    role: 'System Engineer',
    location: 'Palma de Mallorca, Spain',
    summary: 'Security & Infrastructure specialist per il settore bancario.',
    details: [
      'Sicurezza & IDS: Penetration Testing e consulenza IDS Advisor.',
      'Progetti Infrastrutturali: Migrazione server Intranet su nuova DMZ protetta.',
      'Network Security: Hardening Firewall Check Point FW-1.',
      'Sistemi Operativi: Amministrazione ambienti BSD (OpenBSD, NetBSD, FreeBSD).'
    ],
    technologies: ['IDS', 'Check Point FW-1', 'OpenBSD', 'Network Security', 'Penetration Testing'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'exp3',
    company: 'COMMISSIONE EUROPEA (CEE)',
    period: '2002 – 2004',
    role: 'Migration Specialist',
    location: 'Liège, Belgium',
    summary: 'Gestione della migrazione critica di 124 server da Windows NT a Samba/Linux.',
    details: [
      'Migrazione Server: Responsabile sicurezza, stabilità e formazione del personale.',
      'Network Administration: Gestione LAN, WAN, VPN e amministrazione remota (Webmin).',
      'Monitoring: Implementazione Netsaint, Dataflow, Ganimede.',
      'Benchmarking: Test comparativi stack tecnologici (Samba vs NT, Apache vs IIS).'
    ],
    technologies: ['Linux Migration', 'Samba', 'VPN', 'Netsaint', 'Apache'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'exp4',
    company: 'ITS – TORINO (CONSULENTE FIAT)',
    period: '1999 – 2001',
    role: 'Senior Unix System Engineer',
    location: 'Turin, Italy',
    summary: 'Realizzazione infrastruttura sistemistica per il portale web del Gruppo FIAT.',
    details: [
      'Progetto Weblinea.it: Infrastruttura Iplanet/Telexis.',
      'Configurazione Server: Installazione Sendmail su SUN Netra e Squid Proxy su Compaq.',
      'Tuning: Hardening e ottimizzazione SuSE e Red Hat Enterprise.'
    ],
    technologies: ['Sun Solaris', 'Squid', 'Sendmail', 'Red Hat', 'SuSE'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 's1',
    title: 'Sistemi Operativi',
    skills: ['Linux (RHEL, CentOS, Ubuntu, Debian)', 'Unix (Solaris, BSD)', 'Windows Server (NT to 2022)']
  },
  {
    id: 's2',
    title: 'Monitoring & HA',
    skills: ['Zabbix (Advanced)', 'Nagios', 'HP OpenView', 'Heartbeat', 'OpenMosix']
  },
  {
    id: 's3',
    title: 'Security & Networking',
    skills: ['IDS Advisor', 'Check Point FW-1', 'Penetration Testing', 'DMZ Design', 'VPN']
  },
  {
    id: 's4',
    title: 'Development & Scripting',
    skills: ['Bash', 'C', 'Perl', 'PHP', 'SQL', 'Assembler']
  }
];

// Added missing PRODUCTS constant for the collection grid
export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aura Soundstone',
    category: 'Audio',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=1000',
    description: 'A tactile speaker crafted from natural sandstone.',
    longDescription: 'The Aura Soundstone is hand-carved from solid sandstone, providing a unique geological aesthetic combined with high-fidelity audio engineering.',
    features: ['360° Omnidirectional Sound', 'Solid Sandstone Housing', 'Bluetooth 5.2', '12-hour Battery']
  },
  {
    id: 'p2',
    name: 'Eos Linen Wrap',
    category: 'Wearable',
    price: 145,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
    description: 'Organic linen wrap designed for focus and calm.',
    features: ['100% Organic Linen', 'Sustainable Dyes', 'Hand-woven Texture']
  }
];

// Added missing JOURNAL_ARTICLES constant for the editorial section
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j1',
    title: 'The Art of Materiality',
    date: 'October 12, 2024',
    excerpt: 'Exploring why the physical touch of an object defines our digital experience.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1200',
    content: 'In an increasingly ephemeral world, the objects we surround ourselves with matter more than ever. Aura explores the bridge between natural substances and technical utility...'
  }
];

export const BRAND_NAME = 'Sergio Grivetto';
export const CONTACT_INFO = {
  phone: '+39 371 1741209',
  email: 'sergio@grivetto.it',
  web: 'https://grivetto.eu',
  instagram: 'https://www.instagram.com/webagency2000/',
  address: 'Via Nicola Fabrizi 76 Interno 40 – 10145 Torino TO Italia'
};
