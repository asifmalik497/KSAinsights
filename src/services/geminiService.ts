export interface GeneratedPost {
  title: { en: string; ar: string; ur: string };
  excerpt: { en: string; ar: string; ur: string };
  content: { en: string; ar: string; ur: string };
  category: string;
}

export async function generateBlogPost(topic: string): Promise<GeneratedPost> {
  const response = await fetch('/api/content/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Generation failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.success || !data.post) {
    throw new Error(data.error || 'Failed to generate blog post');
  }

  return data.post;
}
