export interface RAGContext {
    content: string;
    source: string;
}

// Mock Knowledge Base - In production this would query Pinecone/Supabase
const KNOWLEDGE_BASE = [
    {
        keywords: ["media", "content", "film", "video", "creative"],
        content: "Aavkar Intelligence specializes in AI-augmented creative workbenches for media. We combine filmmaking with engineering to build pipelines that understand story, pacing, and visuals.",
        source: "Media & Content"
    },
    {
        keywords: ["education", "learning", "school", "student", "teacher"],
        content: "In education, Aavkar builds personalized learning paths. Our systems allow teachers to focus on mentorship while AI handles the pacing and curriculum adaptation for each student.",
        source: "Education"
    },
    {
        keywords: ["health", "clinical", "doctor", "patient"],
        content: "For healthcare, we design systems that reduce administrative burden. Our AI supports clinical judgment but does not replace it, focusing on 'presence' for clinicians.",
        source: "Healthcare"
    },
    {
        keywords: ["business", "enterprise", "operations", "employee"],
        content: "We build digital employees for enterprise operations. These agents handle QA, onboarding, and routine decisions, knowing exactly when to escalate to a human.",
        source: "Business"
    },
    {
        keywords: ["philosophy", "software 2.0", "approach"],
        content: "Aavkar follows the 'Software 2.0' philosophy: You specify the goal, the system learns the rules, and you verify the output. We design the verification loops.",
        source: "Philosophy"
    }
];

export async function getContext(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase();

    // Simple keyword matching for mock RAG
    const relevantDocs = KNOWLEDGE_BASE.filter(doc =>
        doc.keywords.some(keyword => lowerQuery.includes(keyword))
    );

    if (relevantDocs.length === 0) {
        return "";
    }

    return relevantDocs.map(doc => `[Source: ${doc.source}] ${doc.content}`).join("\n\n");
}
