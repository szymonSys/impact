"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { Button } from "@/components/atoms/button/Button";
import { Text } from "@/components/atoms/text/Text";
import styles from "./ErrorBoundary.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("ErrorBoundary caught an error:", errorMessage, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <Text variant="h1">Something went wrong</Text>
            <Text color="secondary" className={styles.errorMessage}>
              {this.state.error.message || "An unexpected error occurred"}
            </Text>
            <div className={styles.actions}>
              <Button onClick={this.resetError}>Try Again</Button>
              <Button variant="secondary" onClick={() => (window.location.href = "/")}>
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
