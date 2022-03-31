import { createShotsFolders } from '../utils';
import { collectStories, getIframeUrl, getStoryBookUrl } from './storybook';

const storyBookUrl = getStoryBookUrl(
  'examples/storybook-demo/storybook-static',
);

beforeAll(async () => {
  createShotsFolders();
  process.env.FETCH_STORIES_TIMEOUT = '2000';
});

describe(getStoryBookUrl, () => {
  it('should return a full StoryBook URL', () => {
    expect(getStoryBookUrl('/storybook-static')).toBe(
      'file:///storybook-static',
    );

    expect(getStoryBookUrl('/another/path/storybook-static')).toBe(
      'file:///another/path/storybook-static',
    );

    expect(getStoryBookUrl('relative/path/storybook-static')).toBe(
      `file://${process.cwd()}/relative/path/storybook-static`,
    );

    expect(getStoryBookUrl('file:///path/storybook-static')).toBe(
      'file:///path/storybook-static',
    );

    expect(getStoryBookUrl('http://localhost:8080')).toBe(
      'http://localhost:8080',
    );

    expect(getStoryBookUrl('https://example.com/storybook')).toBe(
      'https://example.com/storybook',
    );
  });
});

describe(getIframeUrl, () => {
  it('should attach the iframe document to the URL', () => {
    expect(getIframeUrl('https://example.com/storybook')).toBe(
      'https://example.com/storybook/iframe.html',
    );

    expect(getIframeUrl('https://example.com/storybook/')).toBe(
      'https://example.com/storybook/iframe.html',
    );
  });
});

describe(collectStories, () => {
  it('should collect stories from StoryBook', async () => {
    expect(await collectStories(storyBookUrl)).toMatchSnapshot();
  });

  it('should fail when using invalid path to StoryBook', async () => {
    await expect(() =>
      collectStories('this/path/does/not/exist'),
    ).rejects.toThrow('NS_ERROR_FILE_NOT_FOUND');
  });

  it('should fail when using invalid URL to StoryBook', async () => {
    await expect(() =>
      collectStories('http://localhost:99999'),
    ).rejects.toThrow('Invalid url');
  });

  it('should timeout when using invalid URL to StoryBook', async () => {
    await expect(() =>
      collectStories(`${storyBookUrl}/nothing/here`),
    ).rejects.toThrow('NS_ERROR_FILE_NOT_FOUND');
  });

  it('should fail if no stories found', async () => {
    await expect(() =>
      collectStories(`${storyBookUrl}/index.html`, true),
    ).rejects.toThrow('Timeout 2000ms exceeded');
  }, 10_000);
});
