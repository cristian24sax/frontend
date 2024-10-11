"use client";

export default function ButtonAuth() {
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (true) {
    return (
      <>
        <button className="btn btn-danger">Sign out</button>
      </>
    );
  }
}
