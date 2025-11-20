const { describe, test, expect, beforeEach, afterEach } = require("@jest/globals");
const blograss = require('../src/blograss');
const RenderInfoDTO = require('../src/dto/RenderInfoDTO');
const BlogInfoDTO = require('../src/dto/BlogInfoDTO');

describe('blograss render core logic', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('현재 연도 분기에서 주차 단위 렌더링 및 월 표기 확인', () => {
        jest.setSystemTime(new Date('2024-01-09T00:00:00Z'));

        const renderInfoDTO = new RenderInfoDTO(
            'tistory',
            'test-blog',
            'large',
            'dark',
            'green',
            'green',
            2024,
            true
        );

        const blogInfoDTOArray = [
            new BlogInfoDTO('2024-01-03', 5, 3),
            new BlogInfoDTO('2023-12-31', 10, 4),
        ];

        const svg = blograss.render(renderInfoDTO, blogInfoDTOArray);

        const grassRects = svg.match(/<rect width="10" height="10"/g) || [];

        expect(svg).toContain("test-blog's tistory blograss - 2024");
        expect(svg).toContain('Jan/7');
        expect(grassRects.length).toBe(8);
        expect(svg).toContain('<rect width="10" height="10" x="0" y="39" rx="2" ry="2" style="fill: #52a44e;"/>');
        expect(svg).not.toContain('style="fill: #6bd064;"');
    });

    test('과거 연도 전체 주차 배치와 주간 컨테이너 위치 확인', () => {
        jest.setSystemTime(new Date('2025-01-01T00:00:00Z'));

        const renderInfoDTO = new RenderInfoDTO(
            'tistory',
            'history-blog',
            'large',
            'dark',
            'green',
            'green',
            2020,
            true
        );

        const blogInfoDTOArray = [
            new BlogInfoDTO('2020-01-01', 1, 1),
            new BlogInfoDTO('2020-12-30', 10, 4),
        ];

        const svg = blograss.render(renderInfoDTO, blogInfoDTOArray);

        const grassRects = svg.match(/<rect width="10" height="10"/g) || [];
        const grassWeekGroups = svg.match(/<g transform="translate\([0-9]+, 73\)">/g) || [];

        expect(grassRects.length).toBe(365);
        expect(grassWeekGroups.length).toBe(Math.ceil(365 / 7));
        expect(svg).toContain('<g transform="translate(45, 73)">');
        expect(svg).toContain('<g transform="translate(721, 73)">');
        expect(svg).toContain('style="fill: #20432b;"/>');
        expect(svg).toContain('style="fill: #6bd064;"/>');
    });
});
