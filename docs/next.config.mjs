import nextra from "nextra";

const withNextra = nextra({
  search: {
    codeblocks: true,
  },
  defaultShowCopyCode: true,
  codeHighlight: true,
});

export default withNextra({
  // ... Other Next.js config options
  // output: 'export'
});
