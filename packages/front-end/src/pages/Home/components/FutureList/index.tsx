import { List } from 'antd';
import ListItem from '@/components/ListItem';
import { useMatches } from '@/hooks/useLens';
import { formatTime } from '@/utils';
import useTranslation from '@/hooks/useTranslation';

// 未来赛事
export default function FutureList() {
  const { notStartMatches } = useMatches();
  const { $t } = useTranslation();
  return (
    <List
      dataSource={notStartMatches}
      renderItem={(item, index) => (
        <ListItem
          rows={[
            {
              name: $t('{#當前獎池金額#}'),
              value: `$${item.totalPool}`,
            },
            {
              name: $t('{#參與人數#}'),
              value: $t('{#%s 人#}').replace('%s', item.totalPlayers as string),
              // value: `${item.totalPlayers} 人`,
            },
            {
              name: $t('{#下注時間#}'),
              value: `${formatTime(Number(item.guessStartTime))} - ${formatTime(
                Number(item.guessEndTime.toString()),
              )}`,
            },
          ]}
          {...item}
        />
      )}
    ></List>
  );
}
