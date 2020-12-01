import { transport } from '@acent/core';
import React from 'react';

class ErrorBoundary extends React.Component {
  state: any;
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(err: Error) {
    return { hasError: true };
  }

  async componentDidCatch(err: Error, errInfo: React.ErrorInfo) {
    const data = {
      content: `name: ${`${err.name}`}\nerrMsg: ${err.message}\nstackmsg:${
        err.stack
      }\nerrInfo: ${errInfo}`,
      errArea: {},
      userInfo: {},
      date: new Date(),
    };

    const errorId: string | boolean = await transport.sendLog(data);
  }

  render() {
    if (this.state.hasError) {
      return <h1>catch error</h1>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
