/**
 * Plugin contract for extending string utilities.
 */
export type StringExtnPlugin = {
  /** The unique plugin name used for registration and lookup. */
  name: string;
  /** The function invoked when the plugin runs. */
  fn: (input: string, ...args: any[]) => string;
};

const plugins = new Map<string, StringExtnPlugin>();

/**
 * Register a plugin for later execution.
 * @param plugin The plugin to register.
 * @throws If a plugin with the same name is already registered.
 */
export function registerPlugin(plugin: StringExtnPlugin): void {
  if (plugins.has(plugin.name)) {
    throw new Error(`Plugin '${plugin.name}' already exists`);
  }

  plugins.set(plugin.name, plugin);
}

/**
 * Execute a registered plugin by name.
 * @param name The plugin name to execute.
 * @param input The input string passed to the plugin.
 * @param args Additional arguments forwarded to the plugin function.
 * @returns The plugin's result string.
 * @throws If the plugin does not exist.
 */
export function runPlugin(
  name: string,
  input: string,
  ...args: any[]
): string {
  const plugin = plugins.get(name);

  if (!plugin) {
    throw new Error(`Plugin '${name}' not found`);
  }

  return plugin.fn(input, ...args);
}

/**
 * List all registered plugin names in registration order.
 * @returns An array of plugin names.
 */
export function listPlugins(): string[] {
  return Array.from(plugins.keys());
}