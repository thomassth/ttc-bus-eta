import { FontWeights, IStackStyles, IStackTokens, ITextStyles } from "@fluentui/react";

export const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
export const stackTokens: IStackTokens = { childrenGap: 15 };
export const stackStyles: Partial<IStackStyles> = {
  root: {
    // width: '960px',
    // margin: '0 auto',
    padding:'1rem',
    textAlign: 'center',
    color: '#605e5c',
  },
};