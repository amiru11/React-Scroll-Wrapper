import React, { PureComponent } from "react";

import Chip from "./components/Chip";
import Arrow from "./components/Arrow";

const { createRef } = React;

type TScorllWrapperState = {
  isMouseDown: boolean;
  scrollLeft: number;
  clientWidth: number;
  scrollWidth: number;
};

class ScrollWrapper extends PureComponent<any, TScorllWrapperState> {
  private wrapperRef: React.RefObject<HTMLDivElement>;
  private startX: number;
  private scrollLeft: number;

  constructor(props: any) {
    super(props);

    this.startX = 0;
    this.scrollLeft = 0;
    this.wrapperRef = createRef<HTMLDivElement>();

    this.state = {
      isMouseDown: false,
      scrollLeft: 0,
      clientWidth: 0,
      scrollWidth: 0
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.setScrollState();
    if (this.wrapperRef.current) {
      this.wrapperRef.current.addEventListener("scroll", this.handleScroll);
    }
  }

  handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    if (this.wrapperRef.current) {
      this.startX = event.pageX - this.wrapperRef.current.offsetLeft;
      this.scrollLeft = this.wrapperRef.current.scrollLeft;
      this.setState({ ...this.state, isMouseDown: true });
    }
  }
  handleMouseLeave() {
    this.setState({ ...this.state, isMouseDown: false });
  }
  handleMouseUp() {
    this.setState({ ...this.state, isMouseDown: false });
  }
  handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { isMouseDown } = this.state;
    if (!isMouseDown) return;
    event.preventDefault();

    if (this.wrapperRef.current) {
      const currentX = event.pageX - this.wrapperRef.current.offsetLeft;
      const walk = (currentX - this.startX) * 1; //scroll-fast
      this.wrapperRef.current.scrollTo({
        left: this.scrollLeft - walk,
        behavior: "auto"
      });
    }
  }
  handleScroll(event: any) {
    if (this.wrapperRef.current) {
      const { scrollLeft } = this.wrapperRef.current;
      this.setState((state) => ({
        ...state,
        scrollLeft
      }));
    }
  }

  setScrollState(): void {
    if (this.wrapperRef.current) {
      const { scrollWidth, clientWidth } = this.wrapperRef.current;
      console.log(scrollWidth, clientWidth);
      this.setState((state) => ({ ...state, scrollWidth, clientWidth }));
    }
  }

  handleChangeIndex(isNext: boolean): void {
    if (this.wrapperRef.current) {
      const { scrollLeft, clientWidth } = this.wrapperRef.current;
      let wrapperScroll = scrollLeft - clientWidth;
      if (isNext) {
        wrapperScroll = scrollLeft + clientWidth;
      }

      this.wrapperRef.current.scrollTo({
        left: wrapperScroll,
        behavior: "smooth"
      });
      this.setState((state) => ({ ...state }));
    }
  }

  render() {
    const { scrollLeft, scrollWidth, clientWidth } = this.state;
    return (
      <div className="scroll-container">
        {scrollLeft > 0 && (
          <Arrow
            isNext={false}
            value={0}
            onClick={() => this.handleChangeIndex(false)}
          />
        )}
        <div
          className="scroll-wrapper"
          ref={this.wrapperRef}
          onMouseDown={this.handleMouseDown}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        >
          <div className="scroll-content">
            <Chip title={"12345"} value={"12345"} />
            <Chip title={"1234567"} value={"1234567"} />
            <Chip title={"123456789"} value={"123456789"} />
            <Chip title={"12345678910"} value={"12345678910"} />
            <Chip title={"1234567891011"} value={"1234567891011"} />
            <Chip title={"123456789101112"} value={"123456789101112"} />
            <Chip title={"123456789101113"} value={"123456789101113"} />
          </div>
        </div>
        {scrollWidth - scrollLeft > clientWidth && (
          <Arrow
            isNext={true}
            value={0}
            onClick={() => this.handleChangeIndex(true)}
          />
        )}
      </div>
    );
  }
}

export default ScrollWrapper;
