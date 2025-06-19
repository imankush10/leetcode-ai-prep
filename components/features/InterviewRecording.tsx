import { CheckCircle, Download, Share, FileText, Volume2, Clock, Award, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const InterviewRecording = () => {
  const recordingTime = "18:00";
  const interviewScore = 87;

  const pastRecordings = [
    { 
      id: 1, 
      title: "Two Sum Problem", 
      date: "2024-05-20", 
      duration: "28:15", 
      score: 92,
      hasTranscript: true,
      hasFeedback: true,
      fileSize: "12.3 MB"
    },
    { 
      id: 2, 
      title: "System Design: Chat App", 
      date: "2024-05-18", 
      duration: "45:30", 
      score: 85,
      hasTranscript: true,
      hasFeedback: true,
      fileSize: "18.7 MB"
    },
    { 
      id: 3, 
      title: "React Optimization", 
      date: "2024-05-15", 
      duration: "32:20", 
      score: 88,
      hasTranscript: false,
      hasFeedback: true,
      fileSize: "14.1 MB"
    }
  ];

  return (
    <div className="bg-gray-900/50 border border-gray-700/30 rounded-2xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interview Completed Section */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 mx-auto bg-green-500/20 border-2 border-green-500/40 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Interview Completed</h3>
              <p className="text-green-400 text-lg font-medium">Recording Successful</p>
              <p className="text-white/60 text-sm">Duration: {recordingTime} minutes</p>
            </div>
          </div>

          {/* Interview Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/40 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-400 font-semibold">Duration</span>
              </div>
              <div className="text-white text-lg font-bold">{recordingTime}</div>
              <div className="text-gray-400 text-xs">Total time</div>
            </div>
            
            <div className="bg-gray-800/40 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-400 font-semibold">Score</span>
              </div>
              <div className="text-white text-lg font-bold">{interviewScore}%</div>
              <div className="text-gray-400 text-xs">Performance</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800/40 p-6 rounded-lg">
            <h4 className="text-white font-semibold mb-4">Interview Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-sm">Play Recording</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 p-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm">View Transcript</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 hover:bg-green-500/30 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">View Feedback</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center space-x-2 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-300 hover:bg-amber-500/30 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download All</span>
              </motion.button>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 p-4 rounded-lg">
            <p className="text-green-300 text-sm text-center">
              🎉 Great job! Your interview has been saved with high-quality audio, 
              real-time transcript, and detailed AI feedback.
            </p>
          </div>
        </div>

        {/* Past Recordings & Transcripts */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-white">Previous Interviews</h4>
          <div className="space-y-4 max-h-80 overflow-y-auto hide-scrollbar">
            {pastRecordings.map((recording, index) => (
              <motion.div
                key={recording.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/40 p-4 rounded-lg hover:bg-gray-700/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="text-white font-medium">{recording.title}</h5>
                    <p className="text-gray-400 text-sm">{recording.date}</p>
                    <p className="text-gray-500 text-xs">{recording.fileSize} • {recording.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{recording.score}%</div>
                    <div className="flex items-center space-x-2 mt-1">
                      {recording.hasTranscript && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full" title="Transcript available" />
                      )}
                      {recording.hasFeedback && (
                        <div className="w-2 h-2 bg-purple-400 rounded-full" title="AI feedback available" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 flex-wrap gap-2">
                  <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-blue-300 text-xs hover:bg-blue-500/30 transition-colors">
                    <Volume2 className="w-3 h-3" />
                    <span>Play</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-300 text-xs hover:bg-green-500/30 transition-colors">
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                  {recording.hasTranscript && (
                    <button className="flex items-center space-x-1 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-300 text-xs hover:bg-purple-500/30 transition-colors">
                      <FileText className="w-3 h-3" />
                      <span>Transcript</span>
                    </button>
                  )}
                  <button className="flex items-center space-x-1 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded text-amber-300 text-xs hover:bg-amber-500/30 transition-colors">
                    <Share className="w-3 h-3" />
                    <span>Share</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Storage Info */}
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-lg border border-amber-500/30">
            <h5 className="text-amber-300 font-semibold mb-2">Storage Usage</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Audio Files</span>
                <span className="text-white">1.2 GB / 5 GB</span>
              </div>
              <div className="w-full bg-gray-700/40 rounded-full h-2">
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full w-1/4" />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Transcripts: 45 MB</span>
                <span>Auto-delete after 90 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewRecording;