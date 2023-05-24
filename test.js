const areaList = [{ areaId: 'area001', deviceName: '강남역 4번 출구 정류장', deviceId: 'device001', deviceType: 'SHELTER' }
    , { areaId: 'area002', deviceName: '강남역 4번 출구 쉘터', deviceId: 'device002', deviceType: 'POLL' }
    , { areaId: 'area003', deviceName: '강남역 4번 출구 스마트도서관', deviceId: 'device003', deviceType: 'LIBRARY' }
    , { areaId: 'area004', deviceName: '역삼역 1번 출구 스마트폴', deviceId: 'device004', deviceType: 'STATION' }
    , { areaId: 'area002', deviceName: '삼성역 2번 출구 스마트폴', deviceId: 'device002', deviceType: 'POLL' }
    , { areaId: 'area003', deviceName: '도봉역 3번 출구 스마트폴', deviceId: 'device003', deviceType: 'LIBRARY' }
    , { areaId: 'area004', deviceName: '금정역 4번 출구 스마트폴', deviceId: 'device004', deviceType: 'STATION' }
    , { areaId: 'area005', deviceName: '금정역 4번 출구 스마트폴', deviceId: 'device004', deviceType: 'EXTRA' }
];



const mergedList = areaList.reduce((prev, curr) => {
    const type = curr.deviceType;
    console.log(prev , curr);
    
    if (!prev[type]) {
        prev[type] = []
    }
    prev[type].push(curr);
    return prev;
}, {}
);


console.log(JSON.stringify(mergedList))