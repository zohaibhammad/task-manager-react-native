import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddTaskScreen from '@/app/add-task';
import { TaskRepositoryProvider } from '@/repositories/TaskRepositoryAPI';
import { useRouter, useLocalSearchParams } from 'expo-router';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
    Stack: {
        Screen: jest.fn(),
    },
}));

describe('AddTaskScreen', () => {
    const backMock = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ back: backMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <TaskRepositoryProvider>{children}</TaskRepositoryProvider>
    );

    it('renders and adds a task', () => {
        (useLocalSearchParams as jest.Mock).mockReturnValue({});
        const { getByPlaceholderText, getByText } = render(<AddTaskScreen />, {
            wrapper: Wrapper,
        });

        const input = getByPlaceholderText('Task title');
        fireEvent.changeText(input, 'New Test Task');

        const button = getByText('Save Task');
        fireEvent.press(button);

        expect(backMock).toHaveBeenCalled();
    });

    it('renders for editing', () => {
        (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '1' });
        const { getByPlaceholderText } = render(<AddTaskScreen />, {
            wrapper: Wrapper,
        });

        expect(getByPlaceholderText('Task title')).toBeTruthy();
    });
});
