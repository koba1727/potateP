import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Container, Navbar, NavItem, Nav, Row, Col } from "reactstrap";
import { WithEventSideBar } from "./sidebar";
import st from "./schedule.module.css";
import cn from "classnames";
import { ScheduleDetailModal } from "./schedule_detail_modal";
export interface ScheduleItem {
  id: number;
  sh: number;
  sm: number;
  eh: number;
  em: number;
  title: string;
  description?: string;
  color: string;
}
const items: ScheduleItem[] = [
  {
    id: 0,
    sh: 7,
    sm: 30,
    eh: 11,
    em: 45,
    title: "映画",
    description: "スターウォーズ",
    color: "red"
  },
  {
    id: 1,
    sh: 4,
    sm: 30,
    eh: 4,
    em: 40,
    title: "見えない",
    description: "aaaaaaaaaaaa",
    color: "gray"
  },
  {
    id: 2,
    sh: 6,
    sm: 30,
    eh: 7,
    em: 0,
    title: "小さい",
    description: "aaaaaaaaaaaa",
    color: "#00FFFF"
  }
];

export const Schedule: React.FC<RouteComponentProps<{
  sid: string;
  eid: string;
}>> = props => {
  const params = props.match.params;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalProp, setModalProp] = React.useState<ScheduleItem>();
  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const modalOpen = (item: ScheduleItem) => {
    setModalProp(item);
    modalToggle();
  };
  const line = () => {
    const list = [];
    for (var i = 0; i < 25; i++) {
      list.push(
        <Row
          className={st.line}
          style={{
            top: `${5 * i}vh`
          }}
        />
      );
    }
    return list;
  };
  const timeDisp = () => {
    const list = [];
    for (var i = 0; i < 25; i++) {
      list.push(
        <div
          className={cn(st.time_disp)}
          style={{
            top: `${2.5 + 5 * i}vh`
          }}
        >
          {`${i}:00`}
        </div>
      );
    }
    console.log(list);
    return list;
  };
  const item = () => {
    const list: JSX.Element[] = [];
    items.forEach(item => {
      const topPos = `${5 + item.sh * 5 + (5 * item.sm) / 60}vh`;
      const height = () => {
        if (item.sm < item.em) {
          return (item.eh - item.sh) * 5 + (5 * (item.em - item.sm)) / 60;
        } else {
          return (item.eh - item.sh) * 5 - (5 * (item.sm - item.em)) / 60;
        }
      };
      let isOpen = false;
      list.push(
        <Row
          className={cn(st.item)}
          style={{
            top: topPos,
            height: `${height()}vh`,
            width: "100%",
            backgroundColor: item.color,
            borderRadius: "10px"
          }}
          onClick={() => modalOpen(item)}
        >
          <Container>
            {height() > 2 && (
              <Row>
                <Col sm="2">{`${item.sh}:${item.sm} ~ ${item.eh}:${item.em}`}</Col>
                <Col sm="10">{item.title}</Col>
              </Row>
            )}
          </Container>
        </Row>
      );
    });
    return list;
  };
  return (
    <WithEventSideBar eid={params.eid}>
      <Container>
        <Row>
          <h3>スケジュール</h3>
        </Row>
        <Row>
          <Col sm="1" className={cn(st.time)}>
            {timeDisp()}
          </Col>
          <Col sm="11">
            <Container className={cn(st.box)} style={{}}>
              {line()}
              {item()}
            </Container>
          </Col>
        </Row>
      </Container>
      <ScheduleDetailModal
        eid={params.eid}
        sid={params.sid}
        isOpen={isModalOpen}
        detail={modalProp}
        toggle={modalToggle}
      />
    </WithEventSideBar>
  );
};
