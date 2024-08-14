const blogger = google.blogger('v3');

// Function to create and publish a blog post
async function createAndPublishPost() {
  const postContent = '<p>Your HTML blog content here</p>';

  const blogId = 'YOUR_BLOG_ID'; // Replace with your actual Blog ID
  const post = {
    kind: 'blogger#post',
    blog: {
      id: blogId,
    },
    title: 'Your Blog Post Title',
    content: postContent,
  };

  try {
    const response = await blogger.posts.insert({
      auth: oauth2Client,
      blogId,
      resource: post,
    });

    console.log('Post published successfully:', response.data);
  } catch (error) {
    console.error('Error publishing post:', error.message);
  }
}

createAndPublishPost();
