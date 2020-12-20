import { recentErrorId } from '@acent/browser';
import React from 'react';

class ErrorBoundary extends React.Component {
  state: any;
  fallback: React.ReactNode | Function;
  resentErrorId: string;
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.fallback = this.setFallBack(props.fallback);
    this.resentErrorId = '';
  }

  setFallBack(fallback) {
    if (fallback) {
      return fallback;
    }

    return <h1>catch error</h1>;
  }

  static getDerivedStateFromError(err: Error) {
    return { hasError: true };
  }

  componentDidCatch(err: Error, errInfo: React.ErrorInfo) {
    this.resentErrorId = recentErrorId.value;
  }

  render() {
    if (this.state.hasError) {
      if (typeof this.fallback == 'function') {
        this.fallback();
        return <h1>catch error</h1>;
      }
      return this.fallback;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
