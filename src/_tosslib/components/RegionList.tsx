import { Fragment } from 'react';
import { List, ListRow } from '_tosslib/components';
import { colors } from '_tosslib/constants/colors';
import { RegionTreeNode } from '../../pages/remotes';

interface Props {
  list: RegionTreeNode[];
  onClick: (el: RegionTreeNode) => void;
}

export function RegionList({ list, onClick }: Props) {
  return (
    <List>
      {list.map(el => {
        return (
          <Fragment key={el.name}>
            <ListRow
              contents={
                <ListRow.Text1Row
                  top={el.name}
                  topProps={{
                    color: colors.grey700,
                  }}
                />
              }
              withArrow
              onClick={() => onClick(el)}
            />
          </Fragment>
        );
      })}
    </List>
  );
}
