import Calculator from "./components/Calculator";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Calculator />
    </div>
  );
}

export default App;
