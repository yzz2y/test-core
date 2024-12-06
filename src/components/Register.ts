import { CSSResultGroup, LitElement, html, css } from "lit";
import resetCSS from "../Layout/resetCSS";
import gsap from "gsap";
import { customElement, property } from "lit/decorators.js";
import pb from "../api/pocketbase";
import Swal from "sweetalert2";



@customElement('register-element')
class Register extends LitElement {
  
  @property({type: Object}) valid = { // 상태 관리를 위한 상태변수
    step1: false,
    step2: false
  }

  static styles: CSSResultGroup = [
    resetCSS,
    css`
      .container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 440px;
        /* border: 1px solid red; */
        overflow: hidden;
        padding: 1rem;
      
        & h2 {
          font-size: 3rem;
          font-weight: bold;
        }
      
        .line {
          height: 4px;
          background-color: white;
          margin-bottom: 1rem;
      
          & div {
            width: 30%;
            height: 100%;
            background: orange;
          }
        }
      
        .wrapper {
          width: 900px;
          display: flex;
          justify-content: space-between;
      
          & > div {
            width: 440px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
      
          & input {
            border: 1px solid white;
            padding: 1rem;
            min-width: 0.5rem 0;
            outline: none;
          }
      
          & button {
            margin-top: 1.5rem;
            background-color: dodgerblue;
            color: white;
            border: none;
            padding: 1rem;
            cursor: pointer;
      
            &:disabled {
              background-color: #848484;
              color: black;
              cursor: not-allowed;
            }
          }
        }
      
      }
    `
  ]

  get idInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#idField')!;
  }

  get pwInput() {
    return this.renderRoot.querySelector<HTMLInputElement>('#pwField')!;
  }

  handleValidation(e: Event) {
    const target = e.currentTarget as HTMLInputElement; // target이 HTMLElement인지 인지시켜줌
    
    const stepKey = target.id === 'idField' ? 'step1' : 'step2'; // 내가 누른 대상의 id가 뭔지 비교
    this.valid[stepKey] = target.value.length > 5; // true/false가 변수에 담겨서 상태가 update됨

    if (target.value.length > 5) this.requestUpdate(); // 글자수가 넘어가기 전엔 리렌더링 하지 않도록
  }

  handleStep1() {
    const wrapper = this.renderRoot.querySelector('.wrapper');
    gsap.to(wrapper, {x: -460});
  }

  handleStep2() {

    pb.collection('users').create({
      email: this.idInput.value,
      password: this.pwInput.value,
      passwordConfirm: this.pwInput.value
    })
    .then(() => {
      Swal.fire({text: '회원가입 완료! 로그인 페이지로 이동합니다!'})
      .then(() => {
        location.href = '/src/pages/login/';
      })
    })
    .catch(() => {
      Swal.fire({text: '잘못된 정보를 입력하셨습니다.'})
      .then(() => {
        // this.valid.step1 = false;
        // this.valid.step2 = false;
        // this.requestUpdate();
        // this.idInput.value = '';
        // this.pwInput.value = '';
        // const wrapper = this.renderRoot.querySelector('.wrapper');
        // gsap.to(wrapper, {x: 0});
        location.reload();
      })
    })

  }

  
  render() {
    return html `
      <div class="container">
        <h2>회원가입</h2>
        <div class="line">
          <div></div>
        </div>

        <div class="wrapper">
          <div class="step-1">
            <h3>
              로그인에 사용할 <br />
              아이디를 입력해주세요.
            </h3>
            <label for="idField"></label>
            <input 
              @input=${this.handleValidation}
              type="email" 
              id="idField" 
              placeholder="아이디(이메일) 입력" />
            <button 
              @click=${this.handleStep1}
              ?disabled=${!this.valid.step1}
              type="button" 
              class="next-1"
              >다음
            </button>
          </div>
          <div class="step-2">
            <h3>
              로그인에 사용할 <br />
              비밀전호를 입력해주세요.
            </h3>
            <label for="pwField"></label>
            <input 
              @input=${this.handleValidation}
              type="password" 
              id="pwField" 
              placeholder="비밀번호 입력"
               />
            <button 
              @click=${this.handleStep2}
              ?disabled=${!this.valid.step2} 
              type="button" 
              class="next-2"
              >회원가입
            </button>
          </div>
        </div>
      </div>
    `;
  }
}