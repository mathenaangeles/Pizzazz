import * as React from "react";

class NotFound extends React.Component {
  render() {
    return (
      <div className="container mt-5 text-center">
        <div
          style={{
            fontFamily: "Roboto Slab, serif",
            fontWeight: "bold",
            fontSize: "3em",
          }}
        >
          Page Not Found
        </div>
      </div>
    );
  }
}

export default NotFound;
