import { Button, Card, Stack } from "@orion-ds/react";
import styles from "./App.module.css";

function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1>Welcome to {{ projectName }}</h1>
        <p>A lightweight Vite + React project with Orion Design System</p>
        <Stack gap={4} direction="row">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </Stack>
      </Card>
    </div>
  );
}

export default App;
