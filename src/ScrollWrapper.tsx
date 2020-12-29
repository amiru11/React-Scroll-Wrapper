import React, { PureComponent } from "react";

import Chip from "./components/Chip";
import Arrow from "./components/Arrow";

const { createRef } = React;

type TScorllWrapperState = {
  isMouseDown: boolean;
  slideIndex: number;
  totalIndex: number;
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
      slideIndex: 0,
      totalIndex: 0
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.calcurateTotalIndex();
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
      const { scrollLeft, scrollWidth, clientWidth } = this.wrapperRef.current;
      const { slideIndex, totalIndex } = this.state;
      // console.log("scrollWidth", scrollWidth);
      // console.log("clientWidth", clientWidth);
      // console.log("scrollEnd", scrollWidth - scrollLeft === clientWidth);

      // startOfScroll
      if (scrollLeft === 0) {
        this.setState((state) => ({
          ...state,
          slideIndex: 0
        }));
      }

      // middleOfScroll
      if (scrollLeft > 0 && slideIndex * clientWidth < scrollLeft) {
        console.log(
          "(slideIndex + 1) * clientWidth",
          (slideIndex + 1) * clientWidth
        );
        console.log("scrollLeft", scrollLeft);
        if (
          (slideIndex + 1) * clientWidth >= scrollLeft &&
          slideIndex < totalIndex
        ) {
          this.setState((state) => ({ ...state, slideIndex: slideIndex + 1 }));
        }
      }

      // endOfScroll
      if (scrollWidth - scrollLeft === clientWidth) {
        this.setState((state) => ({
          ...state,
          slideIndex: this.state.totalIndex
        }));
      }
    }
  }

  calcurateTotalIndex(): void {
    if (this.wrapperRef.current) {
      const { scrollWidth, clientWidth } = this.wrapperRef.current;
      if (clientWidth < scrollWidth) {
        const totalIndex = Math.floor(scrollWidth / clientWidth);
        console.log("totalIndex", totalIndex);
        this.setState((state) => ({ ...state, totalIndex }));
      }
    }
  }

  handleChangeIndex(isNext: boolean): void {
    if (this.wrapperRef.current) {
      const { scrollLeft, clientWidth } = this.wrapperRef.current;
      let { slideIndex } = this.state;
      let wrapperScroll = scrollLeft - clientWidth;
      slideIndex -= 1;
      if (isNext) {
        wrapperScroll = scrollLeft + clientWidth;
        slideIndex += 1;
      }

      this.wrapperRef.current.scrollTo({
        left: wrapperScroll,
        behavior: "smooth"
      });
      this.setState((state) => ({ ...state, slideIndex }));
    }
  }

  render() {
    const { slideIndex, totalIndex } = this.state;
    // console.log("totalIndex", totalIndex);
    return (
      <div className="scroll-container">
        {slideIndex < totalIndex && totalIndex > 0 && slideIndex > 0 && (
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
        {slideIndex !== totalIndex && totalIndex > 0 && (
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
