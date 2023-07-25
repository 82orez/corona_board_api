// 예외 처리 코드 한 번에 적용하기.

// controller 에 있는 getAll 등의 모든 함수에 각각 개별적으로 try-catch 구문을 사용하여 예외 처리를 할 수도 있지만 이는 매우 지루한 일이고 유지 보수 측면에서도 적합하지 않다.
// 이를 극복하기 위해 예외 처리 코드를 모든 함수에 공통적으로 한 번만 작성할 수 있는 방법이 있다.
// 모든 함수를 공통 예외 처리 핸들러 함수로 감싸주는 방법이다.

// * 1. 아래의 errorHandler 함수는 controller 에 있는 각 함수를 인자로 받아서, try-catch 구문을 포함한 async 함수를 반환한다.
const errorHandler = (controller) => async (req, res) => {
  // async 함수는 controller 함수를 실행(DB CRUD)시켜 그 결과를 반환하거나 예외 처리를 함.
  // DB 와 관련된 CRUD 작업을 해야 하므로(작업에 시간이 소요 되므로) async 동기 처리(순서대로)가 필요.
  try {
    await controller(req, res);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};

// * 2. 외부로 내보내기 위한 controller 함수들이 module.exports 에 객체 형태로 담겨 있으므로, 기존에 있던 객체(obj) 를 인자로 받아서 errorHandler 를 적용한 새로운 객체(obj) 를 생성한다는 의미.
const wrapWithErrorHandler = (obj) => {
  Object.keys(obj).forEach((key) => {
    obj[key] = errorHandler(obj[key]);
  });
  return obj;
};

module.exports = {
  wrapWithErrorHandler,
};

// * 3. controller 파일에 가 아래처럼 wrapWithErrorHandler 함수를 적용해 준다.
/*
module.exports = wrapWithErrorHandler({
  controller 함수들,
});
*/