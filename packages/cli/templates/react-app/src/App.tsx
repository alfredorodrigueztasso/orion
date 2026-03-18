import { Button, Card, Stack, Badge } from '@orion-ds/react';
import { Zap, Package, Palette } from 'lucide-react';
import styles from './App.module.css';

function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <Stack gap={6} align="center" justify="center">
        <div className={styles.header}>
          <h1>Welcome to {{projectName}}</h1>
          <p className={styles.subtitle}>
            Built with React, Vite, TypeScript, and Orion Design System
          </p>
        </div>

        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <h2>Get Started</h2>
            <p>Your project is ready to go. Here's what you can do:</p>

            <Stack gap={4}>
              <div className={styles.feature}>
                <Zap size={24} />
                <div>
                  <h3>Fast Development</h3>
                  <p>Powered by Vite for instant HMR and builds</p>
                </div>
              </div>

              <div className={styles.feature}>
                <Package size={24} />
                <div>
                  <h3>Add Components</h3>
                  <p>
                    Run <code>npx @orion-ds/cli add button card</code> to copy components
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <Palette size={24} />
                <div>
                  <h3>Customize</h3>
                  <p>Edit CSS variables to match your brand and design</p>
                </div>
              </div>
            </Stack>
          </div>
        </Card>

        <div className={styles.buttons}>
          <Button variant="primary" size="md">
            Get Started
          </Button>
          <Button variant="secondary" size="md">
            Learn More
          </Button>
        </div>

        <div className={styles.badges}>
          <Badge variant="success">React 18</Badge>
          <Badge variant="primary">Vite 5</Badge>
          <Badge variant="info">TypeScript</Badge>
          <Badge variant="warning">Orion DS</Badge>
        </div>

        <div className={styles.links}>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            Vite Documentation
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            React Documentation
          </a>
          <a href="https://orion-ds.dev" target="_blank" rel="noreferrer">
            Orion Design System
          </a>
        </div>
      </Stack>
    </div>
  );
}

export default App;
