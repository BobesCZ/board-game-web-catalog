// @ts-expect-error Cannot find module './TestCases.csv' or its corresponding type declarations.
import testCases from './TestCases.csv';
// @ts-expect-error Cannot find module './TestCasesWithTypeGame.csv' or its corresponding type declarations
import testCasesWithTypeGame from './TestCasesWithTypeGame.csv';

export { testCases, testCasesWithTypeGame };
