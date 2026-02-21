/**
 * Test suite for plugin registration and execution utilities in plugin.ts.
 */

type PluginModule = typeof import('../src/plugin.js');

const loadPluginModule = async (): Promise<PluginModule> => {
  // Ensures each test starts with a fresh plugin registry.
  jest.resetModules();
  return import('../src/plugin.js');
};

describe('registerPlugin', () => {
  test('should register a plugin by name', async () => {
    const { registerPlugin, listPlugins } = await loadPluginModule();
    registerPlugin({
      name: 'shout',
      fn: input => `${input}!`
    });

    expect(listPlugins()).toEqual(['shout']);
  });

  test('should throw when registering duplicate plugin name', async () => {
    const { registerPlugin } = await loadPluginModule();
    registerPlugin({
      name: 'dup',
      fn: input => input
    });

    expect(() =>
      registerPlugin({
        name: 'dup',
        fn: input => input.toUpperCase()
      })
    ).toThrow("Plugin 'dup' already exists");
  });
});

describe('runPlugin', () => {
  test('should execute a registered plugin', async () => {
    const { registerPlugin, runPlugin } = await loadPluginModule();
    registerPlugin({
      name: 'wrap',
      fn: (input, left: string, right: string) => `${left}${input}${right}`
    });

    expect(runPlugin('wrap', 'core', '[', ']')).toBe('[core]');
  });

  test('should pass variadic args to plugin function', async () => {
    const { registerPlugin, runPlugin } = await loadPluginModule();
    registerPlugin({
      name: 'join',
      fn: (input, ...parts: string[]) => [input, ...parts].join('-')
    });

    expect(runPlugin('join', 'a', 'b', 'c')).toBe('a-b-c');
  });

  test('should throw when plugin is not found', async () => {
    const { runPlugin } = await loadPluginModule();
    expect(() => runPlugin('missing', 'value')).toThrow("Plugin 'missing' not found");
  });
});

describe('listPlugins', () => {
  test('should return empty array when none registered', async () => {
    const { listPlugins } = await loadPluginModule();
    expect(listPlugins()).toEqual([]);
  });

  test('should list plugins in registration order', async () => {
    // Validates that insertion order is preserved by the registry.
    const { registerPlugin, listPlugins } = await loadPluginModule();
    registerPlugin({
      name: 'first',
      fn: input => input
    });
    registerPlugin({
      name: 'second',
      fn: input => input
    });

    expect(listPlugins()).toEqual(['first', 'second']);
  });
});
