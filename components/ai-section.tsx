// "use client";

// import { motion } from "framer-motion";
// import { Brain, Sparkles, Terminal } from "lucide-react";
// import { SpotlightCard } from "./spotlight-card";

// export function AISection() {
//   return (
//     <section className="py-24 px-4 max-w-6xl mx-auto relative overflow-hidden">
      
//       {/* Effet de fond : des lignes de code floues */}
//       <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
//         {/* Texte */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-wider rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
//             <Sparkles className="h-3 w-3" />
//             Innovation
//           </div>
          
//           <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
//             Je repousse les limites avec l'<span className="text-purple-400">Intelligence Artificielle</span>.
//           </h2>
          
//           <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
//             Au-delà du développement web classique, j'intègre des modèles d'IA pour automatiser les tâches, analyser les données et créer des expériences utilisateur uniques.
//           </p>

//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-purple-500/10 rounded-lg">
//                 <Brain className="h-5 w-5 text-purple-400" />
//               </div>
//               <span className="font-medium">Intégration d'API OpenAI / Gemini</span>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-purple-500/10 rounded-lg">
//                 <Terminal className="h-5 w-5 text-purple-400" />
//               </div>
//               <span className="font-medium">Développement de prompts avancés</span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Visuel (Code / Terminal) */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <SpotlightCard className="p-0 overflow-hidden border-purple-500/20 bg-black/40">
//             {/* Barre de fenêtre */}
//             <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
//               <div className="w-3 h-3 rounded-full bg-red-500/50" />
//               <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
//               <div className="w-3 h-3 rounded-full bg-green-500/50" />
//               <span className="ml-2 text-xs text-white/40 font-mono">ai_assistant.py</span>
//             </div>
            
//             {/* Faux code */}
//             <div className="p-6 font-mono text-sm text-white/80 space-y-2">
//               <p><span className="text-purple-400">import</span> openai</p>
//               <p><span className="text-purple-400">from</span> langchain <span className="text-purple-400">import</span> LLMChain</p>
//               <br />
//               <p><span className="text-gray-500"># Initialisation du modèle</span></p>
//               <p>model = openai.ChatModel(<span className="text-green-400">"gpt-4"</span>)</p>
//               <br />
//               <p><span className="text-purple-400">def</span> <span className="text-blue-400">generate_response</span>(prompt):</p>
//               <p className="pl-4">response = model.predict(prompt)</p>
//               <p className="pl-4"><span className="text-purple-400">return</span> response</p>
//               <br />
//               <p className="text-gray-500"># Prêt à l'emploi...</p>
//               <p className="animate-pulse">_</p>
//             </div>
//           </SpotlightCard>
//         </motion.div>

//       </div>
//     </section>
//   );
// }