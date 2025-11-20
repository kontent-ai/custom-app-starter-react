import { setPopupSize } from "@kontent-ai/custom-app-sdk";
import { useState } from "react";
import { useAppContext } from "./contexts/AppContext.tsx";
import "./App.css";

const App = () => {
  const context = useAppContext();
  const [popupSizeStatus, setPopupSizeStatus] = useState<string>("");

  const handleResizePopup = async () => {
    const response = await setPopupSize({ unit: "px", value: 800 }, { unit: "px", value: 600 });

    if (response.isError) {
      setPopupSizeStatus(`Error: ${response.code} - ${response.description}`);
    } else {
      setPopupSizeStatus("Popup resized to 800x600 pixels");
    }

    setTimeout(() => setPopupSizeStatus(""), 3000);
  };

  return (
    <div className="container">
      <h1>Kontent.ai Custom App Starter</h1>

      <section className="section">
        <h2>Observed Context (Live Updates)</h2>
        <p className="description">
          This context is automatically updated when changes occur using the{" "}
          <code>observeCustomAppContext</code> hook.
        </p>
        <pre className="json-display">{JSON.stringify(context, null, 2)}</pre>
      </section>

      <section className="section">
        <h2>Adjust Popup Size</h2>
        <p className="description">
          Resize the custom app popup to 800x600 pixels using <code>setPopupSize</code>.
        </p>
        <button type="button" onClick={() => void handleResizePopup()} className="button">
          Resize Popup
        </button>
        {popupSizeStatus !== "" && (
          <p className={popupSizeStatus.startsWith("Error") ? "error" : "success"}>
            {popupSizeStatus}
          </p>
        )}
      </section>
    </div>
  );
};

export default App;
