import { Brain, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const LiveAnalysis = () => {
  const analysisMetrics = [
    { label: "Code Quality", value: 85, color: "text-green-400", bg: "bg-green-400" },
    { label: "Problem Solving", value: 92, color: "text-blue-400", bg: "bg-blue-400" },
    { label: "Communication", value: 78, color: "text-yellow-400", bg: "bg-yellow-400" },
    { label: "Technical Depth", value: 88, color: "text-purple-400", bg: "bg-purple-400" }
  ];

  const realtimeFeedback = [
    { type: "positive", message: "Excellent explanation of time complexity", timestamp: "2 min ago" },
    { type: "suggestion", message: "Consider discussing space-time tradeoffs", timestamp: "1 min ago" },
    { type: "neutral", message: "Good use of hash map data structure", timestamp: "30 sec ago" },
    { type: "question", message: "AI wants to explore edge cases next", timestamp: "Just now" }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-700/30 rounded-2xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Live Interview Analysis</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Analyzing in real-time</span>
            </div>
          </div>

          {/* Performance Metrics - Better Layout */}
          <div className="grid grid-cols-2 gap-4">
            {analysisMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/40 p-5 rounded-lg hover:bg-gray-800/60 transition-colors"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300 text-sm font-medium">{metric.label}</span>
                  <span className={`${metric.color} font-bold text-lg`}>{metric.value}%</span>
                </div>
                <div className="w-full bg-gray-700/40 rounded-full h-2">
                  <motion.div
                    className={`${metric.bg} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Combined Analysis Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Code Analysis */}
            <div className="bg-gray-800/40 p-6 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Current Code Analysis</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">O(n)</div>
                  <div className="text-gray-300 text-sm">Time Complexity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">O(n)</div>
                  <div className="text-gray-300 text-sm">Space Complexity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">95%</div>
                  <div className="text-gray-300 text-sm">Efficiency Score</div>
                </div>
              </div>
            </div>

            {/* Interview Timeline */}
            <div className="bg-gray-800/40 p-6 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Interview Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">00:00 - Problem introduction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">05:30 - Started coding solution</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">12:15 - Explained approach clearly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">18:45 - Currently discussing complexity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Feedback */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Live Feedback</h4>
          <div className="space-y-4 max-h-80 overflow-y-auto hide-scrollbar">
            {realtimeFeedback.map((feedback, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-2 ${
                  feedback.type === 'positive' 
                    ? 'bg-green-500/10 border-green-500/50' :
                  feedback.type === 'suggestion'
                    ? 'bg-yellow-500/10 border-yellow-500/50' :
                  feedback.type === 'question'
                    ? 'bg-blue-500/10 border-blue-500/50' :
                    'bg-gray-500/10 border-gray-500/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {feedback.type === 'positive' && <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />}
                  {feedback.type === 'suggestion' && <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />}
                  {feedback.type === 'question' && <Brain className="w-4 h-4 text-blue-400 mt-0.5" />}
                  {feedback.type === 'neutral' && <TrendingUp className="w-4 h-4 text-gray-400 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm text-gray-300 leading-relaxed">{feedback.message}</p>
                    <span className="text-xs text-gray-500 mt-1">{feedback.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6 rounded-lg border border-purple-500/30">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">87%</div>
              <div className="text-purple-300 text-sm">Current Interview Score</div>
              <div className="text-gray-400 text-xs mt-1">Based on real-time analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAnalysis;
