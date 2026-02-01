import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import './WebTerminal.css';

const WebTerminal = ({ onNavigate }) => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const fitAddonRef = useRef(null);
    const commandRef = useRef('');

    // Simulated File System
    const fileSystem = {
        'readme.txt': 'Welcome to the Grivetto.eu System Admin Console.\nAuthorized Personnel Only.',
        'secret_plans.txt': 'Project AntiGravity: Status [CLASSIFIED]',
        'contact.info': 'Email: info@grivetto.eu\nLocation: Torino, Italy',
        'passwords.db': 'Error: Encrypted. You do not have permission to view this file.',
    };

    useEffect(() => {
        // Initialize Terminal
        const term = new Terminal({
            cursorBlink: true,
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            theme: {
                background: '#0d1117',
                foreground: '#00ff41', // Matrix Green
                cursor: '#00ff41',
            },
            rows: 24,
            cols: 80,
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        if (terminalRef.current) {
            term.open(terminalRef.current);
            fitAddon.fit();
            xtermRef.current = term;
            fitAddonRef.current = fitAddon;

            // Welcome Message
            term.writeln('\x1b[1;32mGrivettoOS v1.0.4 (tty1)\x1b[0m');
            term.writeln('Login successful. Welcome, Admin.');
            term.writeln('Type \x1b[1;36mhelp\x1b[0m to see available commands.');
            prompt(term);

            // Input Handling
            term.onData(e => {
                switch (e) {
                    case '\r': // Enter
                        term.write('\r\n');
                        handleCommand(commandRef.current.trim(), term);
                        commandRef.current = '';
                        break;
                    case '\u007F': // Backspace
                        if (commandRef.current.length > 0) {
                            term.write('\b \b');
                            commandRef.current = commandRef.current.slice(0, -1);
                        }
                        break;
                    default:
                        // Filter printable characters
                        if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E)) {
                            term.write(e);
                            commandRef.current += e;
                        }
                }
            });
        }

        // Cleanup
        return () => {
            term.dispose();
        };
    }, []);

    const prompt = (term) => {
        term.write('\r\n\x1b[1;34madmin@grivetto.eu\x1b[0m:\x1b[1;35m~\x1b[0m$ ');
    };

    const handleCommand = (cmd, term) => {
        const args = cmd.split(' ');
        const mainCmd = args[0].toLowerCase();

        switch (mainCmd) {
            case 'help':
                term.writeln('Available commands:');
                term.writeln('  \x1b[36mhelp\x1b[0m      - Show this help message');
                term.writeln('  \x1b[36mls\x1b[0m        - List directory contents');
                term.writeln('  \x1b[36mcat\x1b[0m       - Read a file (cat <filename>)');
                term.writeln('  \x1b[36mclear\x1b[0m     - Clear the terminal screen');
                term.writeln('  \x1b[36mwhoami\x1b[0m    - Show current user');
                term.writeln('  \x1b[36mneofetch\x1b[0m  - Show system info');
                term.writeln('  \x1b[36mexit\x1b[0m      - Return to main GUI');
                break;

            case 'ls':
                term.writeln(Object.keys(fileSystem).join('  '));
                break;

            case 'cat':
                const filename = args[1];
                if (!filename) {
                    term.writeln('Usage: cat <filename>');
                } else if (fileSystem[filename]) {
                    term.writeln(fileSystem[filename]);
                } else {
                    term.writeln(`cat: ${filename}: No such file or directory`);
                }
                break;

            case 'clear':
                term.clear();
                break;

            case 'whoami':
                term.writeln('root (System Administrator)');
                break;

            case 'neofetch':
                term.writeln('\x1b[32m       _.---._    \x1b[0m  \x1b[1;31madmin@grivetto.eu');
                term.writeln('\x1b[32m    .\'"       "`.  \x1b[0m ------------------');
                term.writeln('\x1b[32m   /             \\ \x1b[0m \x1b[36mOS\x1b[0m: GrivettoOS (React Based)');
                term.writeln('\x1b[32m  |              | \x1b[0m \x1b[36mHost\x1b[0m: Vintage Server 9000');
                term.writeln('\x1b[32m  |              | \x1b[0m \x1b[36mKernel\x1b[0m: 5.15.0-generic');
                term.writeln('\x1b[32m   \\             / \x1b[0m \x1b[36mUptime\x1b[0m: 999 days, 23 hours');
                term.writeln('\x1b[32m    `.__     __.\'  \x1b[0m \x1b[36mPackages\x1b[0m: 42 (npm)');
                term.writeln('\x1b[32m       `"---"`     \x1b[0m \x1b[36mShell\x1b[0m: zsh 5.8');
                break;

            case 'exit':
                term.writeln('Logging out...');
                setTimeout(() => {
                    onNavigate('home');
                }, 800);
                return; // Don't prompt again

            case '':
                break;

            default:
                term.writeln(`Command not found: ${mainCmd}`);
        }

        prompt(term);
    };

    return (
        <div className="terminal-wrapper fade-in">
            <div className="monitor-frame">
                <div className="screen-glare"></div>
                <div className="terminal-container" ref={terminalRef}></div>
            </div>

            <div className="terminal-controls">
                <button className="btn-retro" onClick={() => onNavigate('home')}>POWER OFF</button>
            </div>
        </div>
    );
};

export default WebTerminal;
