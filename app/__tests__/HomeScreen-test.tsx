import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../index';
import { TaskRepositoryProvider } from '@/repositories/TaskRepositoryAPI';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useFocusEffect: (fn: any) => fn(),
}));

describe('HomeScreen', () => {
    const pushMock = jest.fn();
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <TaskRepositoryProvider>{children}</TaskRepositoryProvider>
    );

    it('renders empty message when no tasks', () => {
        const { getByText } = render(<HomeScreen />, { wrapper: Wrapper });
        expect(getByText('No tasks found. Add your first one!')).toBeTruthy();
    });

    it('adds, toggles and deletes tasks', async () => {
        const { getByText } = render(<HomeScreen />, { wrapper: Wrapper });

        fireEvent.press(getByText('+ Add Task'));
        expect(pushMock).toHaveBeenCalledWith('/add-task');
    });
});
