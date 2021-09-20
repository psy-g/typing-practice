import React from "react";
import styled from "styled-components";

import RankingGraphDetail from "components/ranking/graph/RankingGraphDetail";

const RankingGraphBody = ({ record }) => {
  return (
    <BodyBlock>
      <GraphWrapper>
        <PercentIndicator>
          <Percent0 />
          <Percent20 />
          <Percent40 />
          <Percent60 />
          <Percent80 />
          <Percent100 />
        </PercentIndicator>
        <GraphIndicator>
          <GraphBar>
            {record.best
              ? record.best.map((ele, idx) => (
                  <RankingGraphDetail
                    key={idx}
                    best={ele}
                    user={record.user[idx]}
                  />
                ))
              : null}
          </GraphBar>
          <GraphCount>
            {[1, 2, 3, 4, 5, 6, 7, "합계"].map((ele, idx) => (
              <span key={idx}>{ele}</span>
            ))}
          </GraphCount>
        </GraphIndicator>
      </GraphWrapper>
    </BodyBlock>
  );
};

export default RankingGraphBody;

const BodyBlock = styled.div`
  height: 90%;
`;

const GraphWrapper = styled.div`
  position: relative;
  border: 1px solid #aaa;
  max-width: 800px;
  min-height: 190px;
  height: 20vh;
  margin: auto;
`;

const PercentIndicator = styled.div`
  width: 100%;
  height: 105%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  position: absolute;

  div {
    position: relative;
    width: 100%;
    height: 5%;
    margin-left: -1px;
    border-top: 1px dashed #aaa;
  }
`;

const Percent0 = styled.div`
  :before {
    font-size: max(0.5em, 0.6vw);
  }
`;

const Percent20 = styled.div`
  :before {
    content: "150";
    font-size: max(0.5em, 0.6vw);
  }
`;

const Percent40 = styled.div`
  :before {
    content: "300";
    font-size: max(0.5em, 0.6vw);
  }
`;

const Percent60 = styled.div`
  :before {
    content: "450";
    font-size: max(0.5em, 0.6vw);
  }
`;

const Percent80 = styled.div`
  :before {
    content: "600";
    font-size: max(0.5em, 0.6vw);
  }
`;

const Percent100 = styled.div`
  :before {
    content: "750";
    font-size: max(0.5em, 0.6vw);
  }
`;

const GraphIndicator = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GraphBar = styled.ul`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  position: relative;
  margin: 0px;
  z-index: 2;
`;

const GraphCount = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 2fr;
  font-size: max(0.5em, 0.6vw);

  span {
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 0px;
    z-index: 2;
  }
`;
