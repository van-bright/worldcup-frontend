import { useEffect, useState } from 'react';
import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
import { useMatchStore } from '@/models';
import { formatTime } from '@/utils';
import { CountriesById } from '@/constant/Countries';

export interface InfoProps {
  active: number;
  onChange: (active: number) => void;
}

export default function Info(props: InfoProps) {
  const { $t, locale } = useTranslation();
  const [active, setActive] = useState(1);
  const { currentMatch } = useMatchStore();
  const [imgs, setImgs] = useState<string[]>([]);

  const change = (key: number) => {
    setActive(key);
    props.onChange(key);
  };

  useEffect(() => {
    const initImg = async () => {
      if (currentMatch?.countryA && currentMatch?.countryA) {
        const a = await import(
          `../../../../assets/img/countries/${currentMatch.countryA.toNumber()}@2x.png`
        );
        const b = await import(
          `../../../../assets/img/countries/${currentMatch.countryB.toNumber()}@2x.png`
        );
        console.log('import countries img=', a.default);
        setImgs([a.default, b.default]);
      }
    };
    initImg();
  }, [currentMatch?.countryA, currentMatch?.countryA]);

  // console.log('currentMatch===', currentMatch)
  return (
    <>
      {currentMatch && (
        <div className={styles.info}>
          {
            currentMatch?.status === 3 ? (
              <>
                <h2 className={styles.h2}>
                  <span>{$t('{#比賽已結束#}')}</span>
                </h2>
                <div className={styles.tip}>
                  {$t('{#結束時間#}')}：
                  {formatTime(
                    currentMatch.matchEndTime.toNumber(),
                    locale === 'zh-hk' ? 'MM月DD日 hh:mm' : 'MM.DD hh:mm',
                  )}
                </div>
              </>
            ) : (
                <>
                  <h2 className={styles.h2}>
                    <span>{currentMatch?.status === 0? $t('{#競猜即將開始#}') : $t('{#競猜進行中#}')}</span>
                  </h2>
                  <div className={styles.tip}>
                    {$t('{#下注時間#}')}：
                    {formatTime(
                      currentMatch.guessStartTime.toNumber(),
                      locale === 'zh-hk' ? 'MM月DD日 hh:mm' : 'MM.DD hh:mm',
                    )}
                    -
                    {formatTime(
                      currentMatch.guessEndTime.toNumber(),
                      locale === 'zh-hk' ? 'MM月DD日 hh:mm' : 'MM.DD hh:mm',
                    )}
                  </div>
                </>
            )}
          <div className={styles.detail}>
            <div>
              <label>
                {locale === 'zh-hk'
                  ? CountriesById[currentMatch.countryA.toNumber()].zhName
                  : CountriesById[currentMatch.countryA.toNumber()].enName}
              </label>
              <div className={styles.nation}>
                <img src={imgs[0]} alt="" />
              </div>
            </div>
            <div>
              <label>
                {locale === 'zh-hk'
                  ? CountriesById[currentMatch.countryB.toNumber()].zhName
                  : CountriesById[currentMatch.countryB.toNumber()].enName}
              </label>
              <div className={styles.nation}>
                <img src={imgs[1]} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.tabs}>
            <div
              className={active === 1 ? styles.active : ''}
              onClick={() => change(1)}
            >
              {$t('{#輸贏競猜#}')}
            </div>
            <div
              className={active === 2 ? styles.active : ''}
              onClick={() => change(2)}
            >
              {$t('{#比分競猜#}')}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
