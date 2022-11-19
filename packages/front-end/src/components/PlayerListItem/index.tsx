import React, { useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { ListItemProps, PlayerRecords, MatchStatus } from '@/hooks/types';
import { CountriesById } from '@/constant/Countries';
import { useMatchStore } from '@/models';
import { toBN, toPow } from '@/utils/bn';
import { toFixed } from '@/utils';
import useTranslation from '@/hooks/useTranslation';

interface RowProps {
  name: string;
  value: string | number;
}
interface IListItemProps extends PlayerRecords {
  onClick?: () => void;
  rows: RowProps[]; // 具体显示的列表信息
}

export default function PlayerListItem(props: IListItemProps) {
  const {
    matchId,
    countryA,
    countryB,
    winAmount,
    scoresA,
    scoresB,
    win,
    status,
    rows,
    token,
    onClick,
    ...rest
  } = props;
  const { setMatch } = useMatchStore();
  const navigate = useNavigate();
  const { $t, locale, isZH } = useTranslation();
  const [imgs, setImgs] = useState<string[]>([]);
  const [scoreVisible, setScoreVisible] = useState(false);

  useEffect(() => {
    const initImg = async () => {
      if (countryA && countryB) {
        const a = await import(
          `../../assets/img/countries/${toBN(countryA).toNumber()}@2x.png`
        );
        const b = await import(
          `../../assets/img/countries/${toBN(countryB).toNumber()}@2x.png`
        );
        setImgs([a.default, b.default]);
      }
    };
    initImg();
  }, [countryA, countryB]);

  useEffect(() => {
    if (status == MatchStatus.MATCH_FINISHED) {
      setScoreVisible(true);
    }
  }, []);

  const handleClick = () => {
    const match = {
      scoresA,
      scoresB,
      ...rest,
    };
    if (onClick) {
      onClick();
      return;
    }
    navigate(`/match/${matchId.toNumber()}?betId=${match.betId?.toString()}`);
  };

  return (
    <div className={styles.listItem} onClick={handleClick}>
      <div className={styles.nav}>
        <div>
          <i>
            <img src={imgs[0]} alt="" />
            <img src={imgs[1]} alt="" />
          </i>
          <span className={styles.vsAB}>
            <span>
              {locale === 'zh-hk'
                ? CountriesById[countryA.toNumber()].zhName
                : CountriesById[countryA.toNumber()].enName}
            </span>
            {/* <strong>VS</strong> */}
            <strong className={styles.vs}></strong>
            <span>
              {locale === 'zh-hk'
                ? CountriesById[countryB.toNumber()].zhName
                : CountriesById[countryB.toNumber()].enName}
            </span>
          </span>
          {scoreVisible && (
            <span className={styles.record}>{`${scoresA} : ${scoresB}`}</span>
          )}
        </div>
        {/* <i className={styles.iconArrow}>{'>'}</i> */}
        <RightOutlined className={styles.iconArrow} />
      </div>
      <div className={styles.detail}>
        {rows.map((item, index) => {
          return (
            <p key={index}>
              <label>{item.name}</label>
              <span>{item.value}</span>
            </p>
          );
        })}
      </div>
      <div className={styles.divider}></div>
      {win && (
        <div className={styles.recordWrap}>
          <label>{$t('{#盈得#}')}</label>
          <span>
            {toFixed(toBN(winAmount).div(toPow(token.decimals)).toString(10))}{' '}
            {token.symbol}
          </span>
        </div>
      )}
      {status === MatchStatus.MATCH_FINISHED &&
        (isZH ? (
          <i
            className={`${styles.result} ${
              win ? styles.iconSuccess : styles.iconError
            }`}
          ></i>
        ) : (
          <i
            className={`${styles.result} ${
              win ? styles.iconSuccessEn : styles.iconErrorEn
            }`}
          ></i>
        ))}
    </div>
  );
}
