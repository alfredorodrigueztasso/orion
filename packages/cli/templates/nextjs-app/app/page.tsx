import { Button, Card, Stack, Badge } from '@orion-ds/react';
import { Zap, Package, Palette } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Stack gap={6} align="center" justify="center">
        <div className={styles.header}>
          <h1>Welcome to {{projectName}}</h1>
          <p className={styles.subtitle}>
            Built with Next.js 15, TypeScript, and Orion Design System
          </p>
        </div>

        <Card className={styles.card}>
          <div className={styles.cardContent}>
            <h2>Get Started</h2>

            <Stack gap={4}>
              <div className={styles.feature}>
                <Zap size={24} />
                <div>
                  <h3>Fast & Modern</h3>
                  <p>Next.js 15 with App Router and server components</p>
                </div>
              </div>

              <div className={styles.feature}>
                <Package size={24} />
                <div>
                  <h3>Add Components</h3>
                  <p>
                    Run <code>npx @orion-ds/cli add button card</code>
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <Palette size={24} />
                <div>
                  <h3>Design System</h3>
                  <p>Built-in theme switching and brand support</p>
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
          <Badge variant="success">Next.js 15</Badge>
          <Badge variant="primary">React 18</Badge>
          <Badge variant="info">TypeScript</Badge>
        </div>
      </Stack>
    </main>
  );
}
