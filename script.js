
// HTML 요소들
const homeScreen = document.getElementById('homeScreen');
const realTimeScreen = document.getElementById('realTimeScreen');
const videoScreen = document.getElementById('videoScreen');

// 버튼들
const realTimeSubtitlesBtn = document.getElementById('realTimeSubtitlesBtn');
const videoSubtitlesBtn = document.getElementById('videoSubtitlesBtn');
const goBackToHomeBtn = document.getElementById('goBackToHomeBtn');
const goBackToHomeBtn2 = document.getElementById('goBackToHomeBtn2');

// 자막 글씨 크기 조정 슬라이더
const fontSizeSlider = document.getElementById('fontSizeSlider');
const fontSizeValue = document.getElementById('fontSizeValue');
const fontSizeSlider2 = document.getElementById('fontSizeSlider2');
const fontSizeValue2 = document.getElementById('fontSizeValue2');

// 실시간 자막 화면 관련
const startMicBtn = document.getElementById('startMicBtn');
const subtitlesBox = document.getElementById('subtitlesBox');
let recognition; // 음성 인식 변수

// 동영상 자막 화면 관련
const videoFileInput = document.getElementById('videoFile2'); // 동영상 파일 업로드 input
const videoPlayer = document.getElementById('videoPlayer2');  // 비디오 플레이어
const subtitlesDiv2 = document.getElementById('subtitles2');  // 자막을 보여줄 div

// 기본 설정
let currentFontSize = fontSizeSlider.value;  // 초기 글씨 크기 값

// 페이지 로딩 후 실행할 코드
document.addEventListener('DOMContentLoaded', () => {
    // 실시간 자막 글씨 크기 조정
    fontSizeSlider.addEventListener('input', () => {
        currentFontSize = fontSizeSlider.value;
        fontSizeValue.textContent = `${currentFontSize}px`;
        subtitlesBox.style.fontSize = `${currentFontSize}px`;
    });

    fontSizeSlider2.addEventListener('input', () => {
        currentFontSize = fontSizeSlider2.value;
        fontSizeValue2.textContent = `${currentFontSize}px`;
        subtitlesDiv2.style.fontSize = `${currentFontSize}px`;
    });

    // 버튼 클릭 시 화면 전환
    realTimeSubtitlesBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        realTimeScreen.style.display = 'block';
    });

    videoSubtitlesBtn.addEventListener('click', () => {
        homeScreen.style.display = 'none';
        videoScreen.style.display = 'block';
    });

    goBackToHomeBtn.addEventListener('click', () => {
        realTimeScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    });

    goBackToHomeBtn2.addEventListener('click', () => {
        videoScreen.style.display = 'none';
        homeScreen.style.display = 'block';
    });

    // 동영상 파일 업로드 후 비디오 플레이어에 로드
    videoFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoURL = URL.createObjectURL(file);
            videoPlayer.src = videoURL;
            videoPlayer.style.display = 'block';  // 비디오 플레이어 보이기
            subtitlesDiv2.style.display = 'none'; // 자막 숨기기
        }
    });

    // 실시간 자막: 마이크로 실시간 음성 인식 (마이크 버튼을 눌렀을 때)
    startMicBtn.addEventListener('click', () => {
        if ('webkitSpeechRecognition' in window) {
            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'ko-KR';  // 한국어 설정

            recognition.onstart = () => {
                console.log('실시간 음성 인식 시작');
            };

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                // 음성 인식된 텍스트를 실시간 자막으로 표시
                subtitlesBox.textContent = transcript;
            };

            recognition.onerror = (event) => {
                console.error('음성 인식 오류:', event.error);
            };

            recognition.onend = () => {
                console.log('음성 인식 종료');
            };

            recognition.start();  // 음성 인식 시작
        } else {
            alert('이 브라우저는 음성 인식 기능을 지원하지 않습니다.');
        }
    });

    // 동영상 자막: 동영상 음성 인식이 아닌, 내 말 인식
    videoPlayer.addEventListener('play', () => {
        if ('webkitSpeechRecognition' in window) {
            if (recognition) {
                recognition.stop();  // 이전 인식 중지
            }

            recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'ko-KR';  // 한국어 설정

            recognition.onstart = () => {
                console.log('동영상 자막 음성 인식 시작');
            };

            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                // 동영상 자막 화면에 내 말 인식된 텍스트를 표시
                subtitlesDiv2.textContent = transcript;
                subtitlesDiv2.style.display = 'block';  // 자막 보이기
            };

            recognition.onerror = (event) => {
                console.error('음성 인식 오류:', event.error);
            };

            recognition.onend = () => {
                console.log('음성 인식 종료');
            };

            recognition.start();  // 음성 인식 시작
        } else {
            alert('이 브라우저는 음성 인식 기능을 지원하지 않습니다.');
        }
    });
});
