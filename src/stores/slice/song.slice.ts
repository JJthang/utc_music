import type { currentSong } from "@/types/song.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  statusSong: boolean;
  currentSong: currentSong;
}

const initialState: CounterState = {
  value: 0,
  statusSong: false,
  currentSong: {
    id: "f745ffea-9b73-4d67-b3fb-a5423cee1058",
    title: "Badtrip",
    duration: 159,
    releaseDate: "2023-03-02T00:00:00.000Z",
    albumId: "9cfad2a2-d7f0-43b8-a370-2a30e00407f0",
    url: "https://res.cloudinary.com/dxa8ks06k/video/upload/v1762443808/utc-music/songs/wdziu58dhzkikcjdekty.mp3",
    coverUri:
      "https://res.cloudinary.com/dxa8ks06k/image/upload/v1762443810/utc-music/covers/hkeemkusyqb36oe9ijwz.jpg",
    views: 978721,
    lyrics:
      "Pretty boy\r\nLại rót thêm cốc bia nhưng mà lười cạn\r\nThành công tao đánh đổi bằng những người bạn\r\nThành công tao đánh đổi bằng cả hạnh phúc\r\nVẵn đặt lên đôi môi một nụ cười tạm\r\nTao chọn giữ nỗi buồn làm của riêng tao\r\nTao thả nó như mưa từ trên trời xuống\r\nChắp tay lạy phật chỉ là chiêm bao\r\nNgửa cổ lên trời tao được mời uống\r\nTao đã không tin vào bản thân (yeah)\r\nTao đã từng tin vào con số (yeah)\r\nYea, tao luôn tin vào tình yêu\r\nNó đến và nó đi như một cơn gió (yeah)\r\nVẫn luôn là em ngày hôm đó (ugh)\r\nMùi hương này phảng phất vào trong gió (yeah)\r\nEm có muốn xem thế giới của anh (ugh)\r\nNó chứa đầy giông tố (yeah)\r\nNó sẽ không chỉ có mỗi âm nhạc\r\nNó có cả thuốc đỏ và cả bông gạc\r\nCó những tờ xanh dương đã bị đâm toạc\r\nĐể anh nhìn cho thật rõ mấy thằng phông bạt\r\nĐể anh nhìn cho thật rõ là ảo ảnh\r\nĐể anh chiêm nghiệm thêm mỗi khi vào cảnh\r\nNhận ra ai là bạn tốt đến khi cần thiết\r\nNhận ra ai tìm niềm vui đến khi nào rảnh\r\nVà tao đây không nói (no talkin')\r\nTao chỉ quan sát (tao chỉ quan sát)\r\nNgắm những tia nắng lấp lánh (yeah)\r\nTràn vào căn gác\r\nSay fuck với tất cả những thứ badvibe (fuck)\r\nCho vào ngăn rác (cho vào ngăn rác)\r\nHọ sẽ làm phim về cuộc đời tao\r\nNăm này qua năm khác (năm này qua năm khác)\r\nChúng nó cứ nhìn cách tao thành công (yeah)\r\nTrong đầu chúng nó tưởng là khá dễ (easy)\r\nChúng nó bất ngờ khi tao vượt lên\r\nNhưng mà lúc đấy thì đã quá trễ\r\nThứ giết chúng ta chính là kỉ niệm (kỉ niệm)\r\nThứ không thay đổi được là kí ức (no)\r\nThứ làm ta nhớ là những bài học (yeah)\r\nThứ cần thay đổi là cái ý thức\r\nLại rót thêm cốc bia nhưng mà lười cạn\r\nThành công tao đánh đổi bằng những người bạn\r\nThành công tao đánh đổi bằng cả hạnh phúc\r\nVẵn đặt lên đôi môi một nụ cười tạm\r\nTao chọn giữ nỗi buồn làm của riêng tao\r\nTao thả nó như mưa từ trên trời xuống\r\nChắp tay lạy phật chỉ là chiêm bao\r\nNgửa cổ lên trời tao được mời uống\r\nVà con người, họ tưởng là họ xấu nhưng mà họ không (no)\r\nChọn cách xả bản thân vào những thứ trần tục\r\nPhần ác và phần thiện luôn muốn đọ công\r\nHọ không thể kiểm soát một cách thuần thục\r\nVà khi mà thể xác đã bị vấy bẩn\r\nThì tâm hồn một phần cũng bị vẩn đục\r\nĐến khi mà giọt nước đã tràn ly\r\nTao sẵn sàng giao chiến kể cả mày có cầm lục (Glock)\r\nBackout\r\nTao đấm vào mặt mày đến khi mày blackout (blackout)\r\nVì mỗi một con người đều có riêng một giới hạn\r\nNếu mày vượt qua giới hạn đừng có trách tao\r\nVà tao chỉ đang muốn hưởng trọn vẹn kiếp sống này\r\nVì tao nhận ra sự hữu hạn của tuần hoàn\r\nTao muốn được cười tươi kể cả khi bần hàn\r\nTao đã nhận ra việc mình cần làm\r\nChắp tay, lậy phật (tôn trọng)\r\nCon đến thế giới không phải vì tham\r\nCon muốn được là con, được khóc, được cười\r\nĐược thăm thú, tận hưởng tất cả kì quan\r\nCon muốn được tự hào về bản sắc máu đỏ và da vàng\r\nBởi vì con là người Việt Nam\r\nVà con vẫn luôn biết mình sẽ mãi không cô độc\r\nDù cho tâm trí con bị biệt giam\r\nLại rót thêm cốc bia nhưng mà lười cạn\r\nThành công tao đánh đổi bằng những người bạn\r\nThành công tao đánh đổi bằng cả hạnh phúc\r\nVẵn đặt lên đôi môi một nụ cười tạm\r\nTao chọn giữ nỗi buồn làm của riêng tao\r\nTao thả nó như mưa từ trên trời xuống\r\nChắp tay lạy phật chỉ là chiêm bao\r\nNgửa cổ lên trời tao được mời uống",
    trackNumber: 4,
    artists: [
      {
        songId: "f745ffea-9b73-4d67-b3fb-a5423cee1058",
        artistId: "aa1c8270-2239-4ec2-b5d7-842b4a48d1c7",
        createdAt: "2025-11-06T15:43:31.121Z",
        updatedAt: "2025-11-06T15:43:31.121Z",
        artist: {
          name: "Obito",
        },
      },
      {
        songId: "f745ffea-9b73-4d67-b3fb-a5423cee1058",
        artistId: "11bf7984-fdbd-4d8b-a56b-1ad7dd9b1002",
        createdAt: "2025-11-06T15:43:31.133Z",
        updatedAt: "2025-11-06T15:43:31.133Z",
        artist: {
          name: "MCK",
        },
      },
    ],
  },
};

const currentSong = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    onHandNextSong: () => {},
    onHandPrevSong: () => {},
  },
});

export const { increment, decrement, incrementByAmount } = currentSong.actions;
export default currentSong.reducer;
