
import { Experience, SkillCategory } from './types';

export const TRANSLATIONS = {
    en: {
        nav: {
            experience: 'Experience',
            skills: 'Skills',
            contact: 'Contact',
            backToHome: 'Back to Home'
        },
        hero: {
            badge: '30 Years of Technical Excellence',
            subtitle: 'Senior System Administrator & Infrastructure Engineer.',
            subtitle2: 'Specialized in Linux/Unix, Enterprise Monitoring, and Network Security.',
            cta: 'View Experience'
        },
        experience: {
            title: 'Professional Journey'
        },
        expertise: {
            arsenal: 'Technical Arsenal',
            title: 'Expertise & Skills',
            desc: 'Over 30 years of critical systems administration, mass migrations, and security infrastructure design.'
        },
        footer: {
            headline: "Let's build stable systems.",
            links: 'Links',
            career: 'Career Path',
            expertise: 'Expertise',
            languages: 'Languages',
            lang_it: 'Italian',
            lang_en: 'English',
            lang_es: 'Spanish',
            native: 'Native',
            prof: 'Professional',
            copyright: 'Built with stability in mind.'
        }
    },
    it: {
        nav: {
            experience: 'Esperienza',
            skills: 'Competenze',
            contact: 'Contatti',
            backToHome: 'Torna alla Home'
        },
        hero: {
            badge: '30 Anni di Eccellenza Tecnica',
            subtitle: 'Senior System Administrator & Infrastructure Engineer.',
            subtitle2: 'Specializzato in Linux/Unix, Enterprise Monitoring e Sicurezza di Rete.',
            cta: 'Vedi Esperienza'
        },
        experience: {
            title: 'Percorso Professionale'
        },
        expertise: {
            arsenal: 'Arsenale Tecnico',
            title: 'Esperienza & Skills',
            desc: 'Oltre 30 anni di amministrazione di sistemi critici, migrazioni di massa e progettazione di infrastrutture di sicurezza.'
        },
        footer: {
            headline: "Costruiamo sistemi stabili.",
            links: 'Link',
            career: 'Percorso',
            expertise: 'Competenze',
            languages: 'Lingue',
            lang_it: 'Italiano',
            lang_en: 'Inglese',
            lang_es: 'Spagnolo',
            native: 'Madrelingua',
            prof: 'Professionale',
            copyright: 'Costruito pensando alla stabilità.'
        }
    }
};

export const EXPERIENCES_IT: Experience[] = [
    {
        id: 'exp1',
        company: 'NPO TORINO ITALY',
        period: '2013 – Oggi',
        role: 'Senior System Administrator',
        location: 'Torino, Italia',
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
        location: 'Palma di Maiorca, Spagna',
        summary: 'Specialista Security & Infrastructure per il settore bancario.',
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
        location: 'Liegi, Belgio',
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
        location: 'Torino, Italia',
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

export const EXPERIENCES_EN: Experience[] = [
    {
        id: 'exp1',
        company: 'NPO TORINO ITALY',
        period: '2013 – Today',
        role: 'Senior System Administrator',
        location: 'Turin, Italy',
        summary: 'Management of enterprise monitoring infrastructure for a fleet of hundreds of servers.',
        details: [
            'Zabbix Monitoring Management: Installation and configuration of agents on heterogeneous environments.',
            'Software Engineering: Creation of custom Zabbix agent builds for Linux with static linking.',
            'Quality Assurance: Agent troubleshooting and service continuity guarantee.'
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
        summary: 'Security & Infrastructure specialist for the banking sector.',
        details: [
            'Security & IDS: Penetration Testing and IDS Advisor consultancy.',
            'Infrastructure Projects: Intranet server migration to new protected DMZ.',
            'Network Security: Check Point FW-1 Firewall Hardening.',
            'Operating Systems: BSD environment administration (OpenBSD, NetBSD, FreeBSD).'
        ],
        technologies: ['IDS', 'Check Point FW-1', 'OpenBSD', 'Network Security', 'Penetration Testing'],
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 'exp3',
        company: 'EUROPEAN COMMISSION (EEC)',
        period: '2002 – 2004',
        role: 'Migration Specialist',
        location: 'Liège, Belgium',
        summary: 'Management of critical migration of 124 servers from Windows NT to Samba/Linux.',
        details: [
            'Server Migration: Responsible for security, stability, and staff training.',
            'Network Administration: LAN, WAN, VPN management and remote administration (Webmin).',
            'Monitoring: Implementation of Netsaint, Dataflow, Ganimede.',
            'Benchmarking: Technology stack comparative tests (Samba vs NT, Apache vs IIS).'
        ],
        technologies: ['Linux Migration', 'Samba', 'VPN', 'Netsaint', 'Apache'],
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: 'exp4',
        company: 'ITS – TORINO (FIAT CONSULTANT)',
        period: '1999 – 2001',
        role: 'Senior Unix System Engineer',
        location: 'Turin, Italy',
        summary: 'Implementation of systems infrastructure for the FIAT Group web portal.',
        details: [
            'Weblinea.it Project: Iplanet/Telexis infrastructure.',
            'Server Configuration: Sendmail installation on SUN Netra and Squid Proxy on Compaq.',
            'Tuning: Hardening and optimization of SuSE and Red Hat Enterprise.'
        ],
        technologies: ['Sun Solaris', 'Squid', 'Sendmail', 'Red Hat', 'SuSE'],
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
    }
];

export const SKILL_CATEGORIES_IT: SkillCategory[] = [
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

export const SKILL_CATEGORIES_EN: SkillCategory[] = [
    {
        id: 's1',
        title: 'Operating Systems',
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
