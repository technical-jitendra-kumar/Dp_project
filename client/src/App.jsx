import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AnimatedBackground from "./components/AnimatedBackground";

import DataAnalyticsPage       from "./pages/programs/DataAnalyticsPage";
import BusinessAnalyticsPage   from "./pages/programs/BusinessAnalyticsPage";
import DataScienceAIPage       from "./pages/programs/DataScienceAIPage";
import AgenticAIPage           from "./pages/programs/AgenticAIPage";
import InvestmentBankingPage   from "./pages/programs/InvestmentBankingPage";
import MastersTrackPage        from "./pages/programs/MastersTrackPage";

export default function App() {
  return (
    <>
      <AnimatedBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs/data-analytics"                element={<DataAnalyticsPage />} />
          <Route path="/programs/business-analytics"            element={<BusinessAnalyticsPage />} />
          <Route path="/programs/data-science-ai"               element={<DataScienceAIPage />} />
          <Route path="/programs/agentic-ai-prompt-engineering" element={<AgenticAIPage />} />
          <Route path="/programs/investment-banking"            element={<InvestmentBankingPage />} />
          <Route path="/programs/data-ai-masters-track"         element={<MastersTrackPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
