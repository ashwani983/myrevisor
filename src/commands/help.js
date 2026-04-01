import { HelpUI } from '../ui/help.js';

export async function help() {
  const helpUI = new HelpUI();
  helpUI.show();
}
