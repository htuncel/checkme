import {Command} from '@oclif/command';
import chalk from 'chalk';

import todoAPI, {Todo} from '../api/todoAPI';

export default class Remove extends Command {
  static description = 'Remove a todo from list';

  static args = [{name: 'index'}];

  async run() {
    const {args} = this.parse(Remove);

    const index = args.index;
    if (index) {
      const isRemoved: Todo | boolean = todoAPI.remove(index);

      if (isRemoved === false) {
        this.log(`${chalk.red('[Error]')} Index out of bounds: ${index}`);
      }
      if (isRemoved as Todo) {
        this.log(`${chalk.green('[Success]')} Removed todo: ${isRemoved.todo}`);
      }
    } else {
      this.error(chalk.red("please specify the todo's index"));
    }
  }
}
