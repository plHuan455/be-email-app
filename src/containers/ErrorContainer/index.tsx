import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

class ErrorContainer extends React.Component {
  render() {
    return (
      <div className="errorMain">
        <div className="errorPage">
          <div>
            <h1 className="errorCode">404</h1>
            <p className="errorInfo">
              Opps, it seems that this page does not exist.
            </p>
            <p className="errorInfo">If you are sure it should, search for it.</p>
            <Link to={'/'}>
              <Button size="large" type="submit" className="errorBtn">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorContainer;
